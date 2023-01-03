import {useEffect, useReducer} from "react";
import styled from "styled-components";
import {Action, IAnimatedText, initialState, reducer} from "./animatedreducer";

// Default Time Values
const DEF_TYPE_SPEED = 75;
const DEF_DELETE_TIME = 150;
const DEF_DELAY_TIME = 3000;

export default function Index(props: IAnimatedText) {
    const {sentences, characterTypeSpeed, characterDeleteSpeed, delayTime, symbol} = props;
    initialState.sentences = sentences;

    // Access the state and dispatch function from the reducer
    const [state, dispatch] = useReducer(reducer, initialState);
    const {text, sentenceIndex, letterIndex, direction, delay} = state;

    useEffect(() => {
        if (delay) return;
        let interval: any = null;

        // Typing, then delete
        if (direction === Action.TYPING) {
            interval = setInterval(() => {
                dispatch({type: Action.ADD_LETTER});
                if (letterIndex + 1 === sentences[sentenceIndex].length) {
                    dispatch({type: Action.DELETING});
                }
            }, characterTypeSpeed || DEF_TYPE_SPEED);
        }

        // Delete, then move to next sentence
        if (direction === Action.DELETING) {
            interval = setInterval(() => {
                dispatch({type: Action.DELETE_LETTER});

                const nextSentenceIndex = (sentenceIndex + 1) % sentences.length;
                const nextSentence = sentences[nextSentenceIndex];
                if (letterIndex === 0 || text === nextSentence.slice(0, text.length)) {
                    dispatch({type: Action.TYPING});
                }
            }, characterDeleteSpeed || DEF_DELETE_TIME);
        }

        return () => clearInterval(interval);
    }, [characterDeleteSpeed, characterTypeSpeed, letterIndex, sentenceIndex, sentences, text, delay, direction, sentences.length]);


    // Adds a Timer before the current sentence gets removed
    useEffect(() => {
        if (!delay || sentences.length == 1) return;

        const timeout = setTimeout(() => {
            dispatch({type: Action.SET_DELAY, payload: false})
        }, delayTime || DEF_DELAY_TIME);

        return () => clearTimeout(timeout);
    }, [delay, delayTime, sentences.length]);

    return <TextContainer>
        {/* Loop through each character and return a h1 wrap of that character include spaces */}
        {text.split('').map((char, index) => {
            return <h1 key={index}>
                {char === ' ' ? '\u00A0' : char}
            </h1>
        })}

        <Cursor symbol={symbol || "|"}/>
    </TextContainer>
}


// Styled Components
export const TextContainer = styled.span`
  display: flex;
  flex-direction: row;

  flex-wrap: wrap;
  overflow: hidden;
  white-space: nowrap;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
  padding-bottom: 0.5rem;
`;


const Cursor = styled.h1<{ symbol: string }>`
  animation: blink 0.7s infinite;

  &:after {
    content: "${({symbol}) => symbol}";
  }

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;