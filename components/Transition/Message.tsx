import {motion} from "framer-motion";
import styled from "styled-components"
import {FinishedTransition, TransitionContainerProps} from "./index";
import {Action, initialState, reducer} from "../AnimatedText/animatedreducer";
import {useEffect, useReducer} from "react";
import {Cursor, TextContainer} from "../AnimatedText";

interface IMessageProps extends TransitionContainerProps {
    message: string
    click?: boolean
}

export function Message(props: IMessageProps) {
    const {transition, setTransition, message, click} = props;
    initialState.sentences = [message];

    // Access the state and dispatch function from the reducer (AnimatedText)
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
        initial: {opacity: 0, transition: {duration: 0.1}},
        animate: {opacity: 1, transition: {duration: 0.1}},
        exit: {opacity: 0, transition: {duration: 0.1}}
    }

    return <Container variants={transitionVariant} initial="initial" animate="animate" exit='exit'>
        <TextContainer>
            {text.split('').map((char, index) => {
                return <h1 key={index}>
                    {char === ' ' ? '\u00A0' : char}
                </h1>
            })}

            <Cursor symbol={"\u00A0|"}/>
        </TextContainer>

        {click && transition.messageComplete && transition.animationComplete && <Click/>}
    </Container>
}


const Container = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 35%;
  height: 15%;
  padding: 1rem;

  border-radius: 10px;
  border: 1px solid white;
  background-color: black;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;

  z-index: 1;


  & > h2 {
    font-size: 1.4rem;
  }

  ${TextContainer} {
    border: none;

    & > h1 {
      font-size: 2rem;
    }
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