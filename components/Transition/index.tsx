import {Canvas} from '@react-three/fiber';
import {AnimatePresence} from "framer-motion";
import {Suspense} from 'react';
import styled from "styled-components";
import FlowField from "./FlowField";

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
    // const {transition, setTransition} = props;

    return <Container>
        <Canvas>
            <ambientLight intensity={1}/>
            <Suspense fallback={null}>
                <FlowField/>
            </Suspense>
        </Canvas>

        {/* On Page Transition Show a Message Box */}
        <AnimatePresence mode='wait'>
            {/*{transition.type === Type.FirstLoad &&*/}
            {/*    <Message key='loadMessage' message="Welcome to my Site" transition={transition}*/}
            {/*             setTransition={setTransition} click/>*/}
            {/*}*/}
        </AnimatePresence>
    </Container>
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.theme.colors.primary};

  & > * {
    background: ${props => props.theme.colors.primary};
  }
`


