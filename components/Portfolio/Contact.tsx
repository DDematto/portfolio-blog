import {useEffect, useState} from "react";
import styled from "styled-components";
import SectionContainer from "./index";
import {AnimatedDIV} from "../AnimatedContainers";
import {GiPartyHat, GiPartyPopper} from "react-icons/gi";
import {MdReportProblem} from "react-icons/md";
import {AnimatePresence, motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import CopyText from "../CopyText";
import dynamic from "next/dynamic";

// Dynamic  import of Form
const Form = dynamic(() => import("../Form"), {ssr: false});

const initialForm = {
    phone: {data: "+1", err: "", color: "white"},
    email: {data: "", err: "Required", color: "white"},
    subject: {data: "", err: "Required", color: "white"},
    name: {data: "", err: "Required", color: "white"},
    inquiry: {data: "General Inquiry", err: ""}
}

export default function Contact() {
    const titles = ["04 - Contact - Lets Talk!"];
    const [response, setResponse] = useState("");
    const [data, setData] = useState(initialForm);
    const [isError, setIsError] = useState(true);

    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.75, delay: 200});

    useEffect(() => {
        setData(initialForm);
        if (response !== "") setTimeout(() => setResponse(""), 10000);
    }, [response]);

    useEffect(() => {
        let errorExists = false;

        for (const [key, value] of Object.entries(data)) {
            if (key === "phone") continue;
            if (value.err !== "") errorExists = true;
        }

        setIsError(errorExists);
    }, [data]);

    const variants = {
        hidden: {opacity: 0, scale: 0.8, transition: {duration: 1.5}},
        visible: {opacity: 1, scale: 1, transition: {duration: 1}},
        exit: {opacity: 0, scale: 0.8, transition: {duration: 1.5}},
    }

    return <SectionContainer titles={titles} defaultText="04 - Contact" height="80vh" id="contact">
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
                    <Form data={data} setData={setData} setResponse={setResponse} isError={isError}/>
                }

            </AnimatePresence>
        </Container>
    </SectionContainer>
}

// Styled Components
const Container = styled(AnimatedDIV)`
  width: 100%;
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

