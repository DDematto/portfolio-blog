import {useEffect, useReducer} from "react";
import styled from "styled-components";
import {Action, IAnimatedText, initialState, reducer} from "./animatedreducer";

// Default Time Values
const TYPE_SPEED = 75;
const DELETE_SPEED = 150;
const DELAY_TIME = 3000;

export default function AnimatedText(props: IAnimatedText) {
    const {sentences, defaultText, symbol, stop} = props;

    // Access the state and dispatch function from the reducer
    const animatedTextState = {
        ...initialState,
        sentences,
        defaultText,
    };
    const [state, dispatch] = useReducer(reducer, animatedTextState);
    const {text, sentenceIndex, letterIndex, direction, delay} = state;

    // Checks if window is too small, if so set the default text and stop in the dispatch
    useEffect(() => {
        // set a listener for the window resize event, if the window is less than 400px, then dispatch stop
        window.addEventListener("resize", () => {
            if (window.innerWidth < 1000) {
                dispatch({type: Action.STOP});
            } else {
                dispatch({type: Action.PLAY});
            }
        });

        return () => {
            window.removeEventListener("resize", () => {
                if (window.innerWidth < 1000) {
                    dispatch({type: Action.STOP});
                } else {
                    dispatch({type: Action.PLAY});
                }
            });
        }
    }, [])

    // update the sentence index and letter index by dispatching an action
    useEffect(() => {
        if (delay || stop) return;
        let interval: any = null;

        // Typing, then delete
        if (direction === Action.TYPING) {
            interval = setInterval(() => {
                dispatch({type: Action.ADD_LETTER});
                if (letterIndex + 1 === sentences[sentenceIndex].length) {
                    dispatch({type: Action.DELETING});
                }
            }, TYPE_SPEED);
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
            }, DELETE_SPEED);
        }

        return () => clearInterval(interval);
    }, [letterIndex, sentenceIndex, sentences, text, delay, direction, sentences.length, stop]);

    // Adds a Timer before the current sentence gets removed
    useEffect(() => {
        if (!delay || stop || sentences.length == 1) return;

        const timeout = setTimeout(() => {
            dispatch({type: Action.SET_DELAY, payload: false})
        }, DELAY_TIME);

        return () => clearTimeout(timeout);
    }, [delay, sentences.length, stop]);

    return <TextContainer>
        {text.split(' ').map((char, index) => {
            return <h1 key={index}>
                {index != 0 && "\u00A0"}
                {char}
            </h1>
        })}

        <Cursor symbol={symbol || "|"}/>
    </TextContainer>
}


// Styled Components
export const TextContainer = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: left;

  flex-wrap: wrap;
  text-overflow: ellipsis;
  white-space: nowrap;

  h1 {
    font-size: 1.5rem;
    font-weight: 400;
  }

  border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
  padding-bottom: 0.5rem;
`;


export const Cursor = styled.h1<{ symbol: string }>`
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