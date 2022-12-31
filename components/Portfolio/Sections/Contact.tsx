import {useEffect, useState} from "react";
import styled from "styled-components";
import SectionContainer from ".";
import {AnimatedDIV} from "../../AnimatedContainers";
import Input from "components/Input";
import Selection from "../../Selection";
import {GiPartyHat, GiPartyPopper} from "react-icons/gi";
import {MdReportProblem} from "react-icons/md";
import {AnimatePresence, motion} from "framer-motion";
import {SubmitButton} from "components/Button";
import axios from 'axios';
import {useInView} from "react-intersection-observer";
import CopyText from "../../CopyText";

const initialForm = {
    phone: {data: "+1", err: "", color: "white"},
    email: {data: "", err: "Required", color: "white"},
    subject: {data: "", err: "Required", color: "white"},
    name: {data: "", err: "Required", color: "white"},
    inquiry: {data: "General Inquiry", err: ""}
}

export default function Contact() {
    const titles = ["04 - Contact - Lets Talk!"];
    const options = ["General Inquiry", "Job Opportunity", "Project Collaboration"];
    const [data, setData] = useState(initialForm);
    const [isError, setIsError] = useState(true);
    const [response, setResponse] = useState("");
    const {phone, email, subject, name, inquiry} = data;

    const onSubmit = (e: any) => {
        e.preventDefault();
        if (isError) return;

        const data = {
            phone: phone.data,
            email: email.data,
            subject: subject.data,
            name: name.data,
            inquiry: inquiry.data
        }

        grecaptcha.ready(function () {
            grecaptcha
                .execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string, {action: "contactSubmit"})
                .then(function (token) {
                    axios.post(process.env.NEXT_PUBLIC_PIPEDREAM_WORKFLOW_URL as string, {
                        ...data,
                        token
                    }, {withCredentials: false})
                        .then(() => setResponse("Good"))
                        .catch(() => setResponse("Error"));
                })
        })
    }

    useEffect(() => {
        setData(initialForm);
        if (response !== "") setTimeout(() => setResponse(""), 10000);
    }, [response]);

    // Verify Form Data
    const nameInput = (e: any) => {
        if (e.target.value === "") {
            setData({...data, name: {data: e.target.value, err: "Required", color: "red"}});
        } else {
            setData({...data, name: {data: e.target.value, err: "", color: "green"}});
        }
    };

    const emailInput = (e: any) => {
        let email = e.target.value;
        let error = "";

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) error = "Invalid Email";

        setData({...data, email: {data: email, err: error, color: error === "" ? "green" : "red"}});
    };

    const inquiryInput = (e: any) => {
        setData({...data, inquiry: {data: e.target.value, err: ""}});
    }

    const phoneInput = (e: any) => {
        let value = e.target.value;
        let formatted: string = value.replace(/\D/g, "");

        if (formatted.length > 0) formatted = "+" + formatted;
        if (formatted.length > 2) formatted = formatted.slice(0, 2) + " (" + formatted.slice(2);
        if (formatted.length > 7) formatted = formatted.slice(0, 7) + ") " + formatted.slice(7);
        if (formatted.length > 12) formatted = formatted.slice(0, 12) + "-" + formatted.slice(12);
        if (formatted.length > 17) formatted = formatted.slice(0, 16);

        let phoneData = {data: formatted, err: "", color: "black"};
        if (formatted.length > 2 && formatted.length < 17) {
            phoneData.err = "Invalid";
            phoneData.color = "red";
        }
        if (formatted.length === 17) {
            phoneData.err = "";
            phoneData.color = "green";
        }

        setData({...data, phone: phoneData});
    }

    const subjectInput = (e: any) => {
        if (e.target.value === "") {
            setData({...data, subject: {data: e.target.value, err: "Required", color: "red"}});
        } else {
            setData({...data, subject: {data: e.target.value, err: "", color: "green"}});
        }
    }

    useEffect(() => {
        let errorExists = false;

        for (const [key, value] of Object.entries(data)) {
            if (key === "phone") continue;
            if (value.err !== "") errorExists = true;
        }

        setIsError(errorExists);
    }, [data]);

    // Form Animation
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.3});
    const variants = {
        hidden: {opacity: 0, scale: 0, transition: {duration: 1.5}},
        visible: {opacity: 1, scale: 1, transition: {duration: 1}},
        exit: {opacity: 0, scale: 0, transition: {duration: 1.5}},
    }

    return <SectionContainer titles={titles} height="90vh">
        <AnimatedDIV>
            <p>
                Thank you for visiting my website! I hope you have enjoyed learning more about me and my skills and
                experience. If you have any questions or would like to get in touch with me, please do not hesitate to
                reach out using the form below. I am always happy to connect with like-minded professionals and
                discuss
                potential opportunities. I look forward to hearing from you! <CopyText text="devindematto@gmail.com"/>
            </p>
        </AnimatedDIV>

        <Container ref={ref}>
            <AnimatePresence mode='wait'>

                {response &&
                    <Response key="r" variants={variants} initial="hidden" animate="visible" exit="exit">
                        {response === "Good" ?
                            <span><GiPartyHat/> <h1>Hooray!</h1> <GiPartyPopper/></span> :
                            <span><MdReportProblem/> Uh Oh! <MdReportProblem/></span>
                        }

                        {response === "Good" ?
                            <h2>Thank you for your message! I will get back to you as soon as possible.</h2> :
                            <h2>There was an error sending your message. Please try again later.</h2>
                        }
                    </Response>
                }

                {inView && !response &&
                    <Form key="f" onSubmit={onSubmit} variants={variants} initial="hidden" animate="visible"
                          exit="exit">
                        <HorizontalContainer>
                            <Input label="Name" value={name} onChange={(e) => nameInput(e)}/>
                            <Input type="email" label="Email" value={email} onChange={(e) => emailInput(e)}/>
                            <Selection name={"inquiry"} options={options} onChange={(e) => inquiryInput(e)}/>
                            <Input type="tel" label="Phone Number" value={phone} onChange={(e) => phoneInput(e)}
                                   optional/>
                        </HorizontalContainer>
                        <Input label="Message" value={subject} onChange={(e) => subjectInput(e)} isTextArea/>
                        <SubmitButton disabled={isError}>Submit</SubmitButton>
                        <Recaptcha>This site is protected by reCAPTCHA and the Google <a
                            href="https://policies.google.com/privacy">Privacy Policy</a> and <a
                            href="https://policies.google.com/terms">Terms of Service</a> apply
                        </Recaptcha>
                    </Form>
                }

            </AnimatePresence>
        </Container>
    </SectionContainer>
}

// Styled Components
const Container = styled(AnimatedDIV)`
  height: 20rem;
  width: 100%;
`;

const Form = styled(motion.form)`
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`

const HorizontalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const Response = styled(motion.div)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  span {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  svg {
    height: 3rem;
    width: 3rem;
  }
`

const Recaptcha = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;

  a {
    text-decoration: underline;
  }
`
