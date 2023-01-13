import {motion} from "framer-motion";
import styled from "styled-components"
import {FinishedTransition, TransitionContainerProps} from "../Transition";
import {Action, initialState, reducer} from "./animatedreducer";
import {useEffect, useReducer} from "react";
import AnimatedText, {Cursor, TextContainer} from "./animatedText";

interface IMessageProps extends TransitionContainerProps {
    message: string
    click?: boolean
}


export function Message(props: IMessageProps) {
    const {transition, setTransition, message, click} = props;
    initialState.sentences = [message];

    // Access the state and dispatch function from the reducer (OldAnimatedText)
    const [state, dispatch] = useReducer(reducer, initialState);
    const {text, letterIndex, sentences, sentenceIndex} = state;

    useEffect(() => {
        const interval = setInterval(() => {
            if (letterIndex === sentences[sentenceIndex].length) {
                clearInterval(interval);
                setTransition({...transition, messageComplete: true});
            } else {
                dispatch({type: Action.ADD_LETTER});
            }
        }, 100);

        return () => clearInterval(interval);
    }, [letterIndex, sentenceIndex, sentences, setTransition]);

    // Change the transition type to none when the message is complete on click
    useEffect(() => {
        if (!click || !transition.messageComplete) return;
        const handleClick = () => setTransition(FinishedTransition);

        window.addEventListener('touchstart', handleClick);
        window.addEventListener('mousedown', handleClick);

        return () => {
            window.addEventListener('touchstart', handleClick);
            window.removeEventListener('mousedown', handleClick);
        }
    }, [click, setTransition, transition]);

    const transitionVariant = {
        initial: {opacity: 0, transition: {duration: 1}},
        animate: {opacity: 1, transition: {duration: 1}},
        exit: {opacity: 0, transition: {duration: 1}}
    }

    return <Container variants={transitionVariant} initial="initial" animate="animate" exit='exit'>
        <TextContainer>
            {text.split(' ').map((char, index) => {
                return <h1 key={index}>
                    {index != 0 && "\u00A0"}
                    {char}
                </h1>
            })}

            <Cursor symbol={"|"}/>
        </TextContainer>

        {click && transition.messageComplete && transition.animationComplete && <Click/>}
    </Container>
}


const Container = styled(motion.div)`
  // center the container on the page, horizontally and vertically
  // however make the container be able to expand based on text size
  // so that the text is always centered
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  height: fit-content;
  padding: 1rem;

  // center the text in the container
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  border-radius: 1rem;
  border: 1px solid ${({theme}) => theme.colors.secondary};

  > h2 {
    font-size: 1rem;
    text-align: center;
  }

  ${TextContainer} {
    justify-content: center;
  }
`

const Click = () => {
    const variants = {
        initial: {opacity: 0, transition: {duration: 1}},
        animate: {opacity: 1, transition: {duration: 1}},
    }

    return <motion.h2 variants={variants} animate='animate' initial='initial'>
        Click Anywhere to Continue
    </motion.h2>
}