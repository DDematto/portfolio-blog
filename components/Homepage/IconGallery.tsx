import {motion} from "framer-motion"
import {useInView} from "react-intersection-observer";
import styled from "styled-components"
import {AnimatedContainer} from "../General/AnimatedContainers";

export default function IconGallery({Icons}: { Icons: { name: string, SVG: JSX.Element, color: string }[] }) {
    const {ref, inView} = useInView({triggerOnce: true, threshold: 0.5});

    return <Container ref={ref}>
        {inView && Icons.map((icon, i) =>
            <Icon key={icon.name} name={icon.name} SVG={icon.SVG} color={icon.color} i={i}/>
        )}
    </Container>
}

const Container = styled(AnimatedContainer)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;

  justify-items: center;
  align-items: start;


  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }


  * > svg {
    width: 3rem;
    height: 3rem;
  }
`

const Icon = ({i, name, SVG, color}: { i: number, name: string, SVG: JSX.Element, color: string }) => {
    const variants = {
        initial: {
            opacity: 0,
            x: -20,
            y: i % 2 == 0 ? -30 : 30,
        },
        animate: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: {duration: 0.3, delay: i * 0.35}
        },
    }

    return <IconContainer variants={variants} initial={"initial"} animate={"animate"} color={color} exit={"exit"}>
        {SVG}
        <p>{name}</p>
    </IconContainer>
}

const IconContainer = styled(motion.div)<{ color: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${props => props.color};
`