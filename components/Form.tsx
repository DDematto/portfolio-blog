import Input from "./Input";
import {SubmitButton} from "./Button";
import styled from "styled-components";
import {motion} from "framer-motion";
import axios from "axios";


export default function Form({data, setData, setResponse, isError}: any) {
    const options = ["General Inquiry", "Job Opportunity", "Project Collaboration"];

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

    // Form Animation
    const variants = {
        hidden: {opacity: 0, scale: 0.8, transition: {duration: 1.5}},
        visible: {opacity: 1, scale: 1, transition: {duration: 1}},
        exit: {opacity: 0, scale: 0.8, transition: {duration: 1.5}},
    }

    return <Container key="f" onSubmit={onSubmit} variants={variants} initial="hidden" animate="visible"
                      exit="exit">
        <HorizontalContainer>
            <Input label="Name" value={name} onChange={(e) => nameInput(e)}/>
            <Input type="email" label="Email" value={email} onChange={(e) => emailInput(e)}/>
            <Input label="Inquiry" isSelect={options} onChange={(e) => inquiryInput(e)}/>
            <Input type="tel" label="Phone Number" value={phone} onChange={(e) => phoneInput(e)}
                   optional/>
        </HorizontalContainer>
        <Input label="Message" value={subject} onChange={(e) => subjectInput(e)} isTextArea/>
        <SubmitButton disabled={isError}>Submit</SubmitButton>
        <Recaptcha>This site is protected by reCAPTCHA and the Google <a
            href="https://policies.google.com/privacy">Privacy Policy</a> and <a
            href="https://policies.google.com/terms">Terms of Service</a> apply
        </Recaptcha>
    </Container>
}

const Container = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
`

const HorizontalContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  grid-gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

`;

const Recaptcha = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;

  a {
    text-decoration: underline;
  }
`
