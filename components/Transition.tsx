import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import styled from "styled-components";

export enum Type {
    None,
    FirstLoad,
}

export const transitionState = {
    type: Type.FirstLoad as Type,
    messageComplete: false,
}

export default function Transition(props: { transition: typeof transitionState, setTransition: any }) {
    const {transition, setTransition} = props;
    const {messageComplete} = transition;

    const firstLoadMessages = ["Welcome to my Portfolio"];

    // Check if transition is complete
    useEffect(() => {
        if (messageComplete) setTransition({...transition, type: Type.None});
    }, [messageComplete, setTransition]);

    return <AnimatePresence mode='wait'>
        {transition.type === Type.FirstLoad &&
            <MessageBox setTransition={setTransition} messages={firstLoadMessages}/>}
    </AnimatePresence>
}

const MessageBox = (props: { messages: string[], setTransition: any }) => {
    const {messages, setTransition} = props;
    const [timer, setTimer] = useState(3);

    useEffect(() => {
        if (timer <= 0) return setTransition({...transitionState, messageComplete: true});

        const interval = setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [setTransition, timer]);


    const containerVariants = {initial: {opacity: 0}, animate: {opacity: 1}, exit: {opacity: 0}};
    const messageVariants = {initial: {opacity: 0, y: -20}, animate: {opacity: 1, y: 0}};

    return <Container variants={containerVariants} animate='animate' exit='exit' initial='initial'>
        <AnimatePresence>
            {messages.map((message, index) => {
                return <motion.h3 key={index} variants={messageVariants} initial='initial' animate='animate'
                                  transition={{duration: 0.5, delay: index * 0.45}}>
                    {message}
                </motion.h3>
            })}

            <motion.h3 variants={messageVariants} initial='initial' animate='animate'
                       transition={{duration: 0.5, delay: messages.length * 0.45}}>
                Continue in {timer} seconds
            </motion.h3>
        </AnimatePresence>
    </Container>
}

const Container = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  border-radius: 1rem;
  border: 1px solid ${props => props.theme.colors.secondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;

  & > *:last-child {
    font-size: 1.2rem;
  }
`;