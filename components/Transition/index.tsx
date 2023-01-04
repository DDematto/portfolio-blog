import {Canvas} from "@react-three/fiber";
import {AnimatePresence} from "framer-motion";
import {useEffect} from "react";
import styled from "styled-components";
import {Message} from "./Message";

export interface TransitionContainerProps {
    transition: typeof FirstTransition
    setTransition: (transition: typeof FirstTransition) => void
}

export enum Type {
    None,
    FirstLoad,
}

export const FirstTransition = {
    type: Type.FirstLoad as Type,
    animationComplete: true,
    messageComplete: false,
}

export const FinishedTransition = {type: Type.None, animationComplete: false, messageComplete: false}

export default function Transition(props: TransitionContainerProps) {
    const {transition, setTransition} = props;

    useEffect(() => {
        const {type, animationComplete, messageComplete} = transition;
        if (type == Type.FirstLoad) return;

        if (animationComplete && messageComplete) {
            setTransition(FinishedTransition);
        }

    }, [setTransition, transition]);

    return <Container>
        <Canvas>
            {/*  Generation of Brain Neurons and Axons Generate more on scroll etc  */}
            {/* As Page Transitions Change Background Changes go Here {HomeEnter, ProjectEnter, etc...}   */}
        </Canvas>

        <AnimatePresence mode='wait'>
            {transition.type === Type.FirstLoad &&
                <Message key='loadMessage' message="Welcome to my Site" transition={transition}
                         setTransition={setTransition} click/>
            }
        </AnimatePresence>
    </Container>
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
`