import {motion} from "framer-motion";
import styled from "styled-components"
import {default as AnimatedText, TextContainer} from "../../General/AnimatedText";

export default function SectionContainer({titles, children}: any) {
    // const controls = useAnimation();
    // const [ref, inView] = useInView();
    // const [hasAnimated, setHasAnimated] = useState(false);
    //
    // useEffect(() => {
    //     if (inView) {
    //         controls.start("visible");
    //         setHasAnimated(true);
    //     }
    //     return () => controls.stop();
    //
    // }, [controls, inView, hasAnimated]);

    const variants = {
        hidden: {opacity: 0, translateY: 20},
        visible: {opacity: 1, translateY: 0}
    }

    return <Container
        key={titles[0]}
        initial="hidden"
        whileInView="visible"
        variants={variants}
        viewport={{once: true}}
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
