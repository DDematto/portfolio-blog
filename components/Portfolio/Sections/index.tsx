import {motion} from "framer-motion";
import styled from "styled-components"
import {default as AnimatedText, TextContainer} from "../../General/AnimatedText";

// https://egghead.io/blog/how-to-animate-elements-when-in-view-on-scroll-with-framer-motion DO SOME EFFECT LIKE THIS WITH SCROLLING
// Do Gradient Animation for SideBorder Component

export default function SectionContainer({titles, children}: any) {
    return <Container
        id={titles[0]}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2.5}}>
        <AnimatedText sentences={titles} symbol={"|"}/>
        {children}
    </Container>
}

const Container = styled(motion.div)`
  padding: 0 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  ${TextContainer} {
    border-bottom: 1px solid #fff;
    padding-bottom: 0.5rem;
  }
`
