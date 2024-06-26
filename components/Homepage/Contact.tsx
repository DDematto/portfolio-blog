import {useEffect, useState} from "react";
import styled from "styled-components";
import Section from "./Section";
import {TextContainer} from "../General/TextContainer";
import {GiPartyHat, GiPartyPopper} from "react-icons/gi";
import {MdReportProblem} from "react-icons/md";
import {motion} from "framer-motion";
import {useInView} from "react-intersection-observer";
import CopyText from "../General/CopyText";
import dynamic from "next/dynamic";
import {exitDuration, inViewForAnimate, startDuration} from "../General/Layout";

// dynamic imports
const FormLazy = dynamic(() => import("./Form"), {ssr: false, suspense: true});

const initialForm = {
    phone: {data: "+1", err: "", color: "white"},
    email: {data: "", err: "Required", color: "white"},
    subject: {data: "", err: "Required", color: "white"},
    name: {data: "", err: "Required", color: "white"},
    inquiry: {data: "General Inquiry", err: ""}
}

export default function Contact() {
    const titles = ["05 - Contact - Lets Talk!"];
    const [response, setResponse] = useState("");
    const [data, setData] = useState(initialForm);
    const [isError, setIsError] = useState(true);


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

    const textContainerVariants = {
        hidden: {opacity: 0, y: 20, transition: {duration: startDuration, ease: "easeOut"}},
        visible: {opacity: 1, y: 0, transition: {duration: startDuration, ease: "easeOut"}},
        exit: {opacity: 0, y: 20, transition: {duration: exitDuration, ease: "easeIn"}}
    };

    const variants = {
        hidden: {opacity: 0, scale: 0.8, transition: {duration: startDuration}},
        visible: {opacity: 1, scale: 1, transition: {duration: startDuration}},
        exit: {opacity: 0, scale: 0.8, transition: {duration: exitDuration}},
    };

    const {ref, inView} = useInView({triggerOnce: true, threshold: inViewForAnimate});
    return <Section titles={titles} defaultText="05 - Contact" height="80vh" id="contact" ref={ref}>
        <TextContainer variants={textContainerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                       exit="exit">
            <p>
                Thank you for visiting my website! I hope you have enjoyed learning more about me and my skills and
                experience. If you have any questions or would like to get in touch with me, please do not hesitate to
                reach out using the form below. I am always happy to connect with like-minded professionals and
                discuss
                potential opportunities. I look forward to hearing from you! <CopyText text="devindematto@gmail.com"/>
            </p>
        </TextContainer>

        <Container>
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
                <FormLazy data={data} setData={setData} setResponse={setResponse} isError={isError}/>
            }
        </Container>
    </Section>
}

// Styled Components
const Container = styled(TextContainer)`
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

