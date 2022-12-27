import {motion, useAnimation} from "framer-motion";
import {useEffect} from "react";
import {useInView} from "react-intersection-observer";
import styled from "styled-components"
import {default as AnimatedText, TextContainer} from "../../General/AnimatedText";

export default function SectionContainer({titles, children}: any) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) controls.start("visible");
    }, [controls, inView]);

    const variants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0}
    }

    return <Container
        ref={ref}
        animate={controls}
        initial="hidden"
        variants={variants}
        transition={{duration: 2}}>
        <AnimatedText sentences={titles} symbol={"|"}/>
        {children}
    </Container>
}

const Container = styled(motion.div)`
  padding: 0 2rem;
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  gap: 1rem;


  ${TextContainer} {
    border-bottom: 1px solid #fff;
    padding-bottom: 0.5rem;
  }
`
