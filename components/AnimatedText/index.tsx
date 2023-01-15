import {AnimationDirection, AnimationState, TextState} from "./state";
import {TextActions} from "./actions";
import {reducer} from "./reducer";
import {useEffect, useReducer} from "react";

export default function useAnimatedText({titles, defaultTxt}: { titles: string[], defaultTxt: string }) {
    const [state, dispatch] = useReducer(reducer, {...TextState, sentences: titles, defaultText: defaultTxt});
    const {curState, text, sentences, sentenceIndex, letterIndex, direction, defaultText}: typeof TextState = state;

    // wrapper for dispatch
    const play = () => dispatch({type: TextActions.Play})
    const stop = () => dispatch({type: TextActions.Stop});
    const setResponsive = () => dispatch({type: TextActions.ResponsiveDefault});
    const setInfo = (payload: any) => dispatch({type: TextActions.setInfo, payload});

    // Check for window resize and setResponsive if window is too small
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setResponsive();
            } else if (curState === AnimationState.Stop) {
                play();
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [curState])

    // Animated Text Logic
    useEffect(() => {
        if (curState === AnimationState.Stop) return;
        let interval: any = null;

        if (direction === AnimationDirection.Typing) {
            interval = setInterval(() => {
                setInfo({letterIndex: letterIndex + 1, text: text + sentences[sentenceIndex][letterIndex]});
                if (letterIndex + 1 === sentences[sentenceIndex].length) {
                    setInfo({direction: AnimationDirection.Deleting});
                    stop()
                }
            }, 100);
        } else if (direction === AnimationDirection.Deleting) {
            interval = setInterval(() => {
                setInfo({
                    letterIndex: letterIndex - 1,
                    text: sentences[sentenceIndex].slice(0, letterIndex - 1)
                });

                const nextSentenceIndex = (sentenceIndex + 1) % sentences.length;
                const nextSentence = sentences[nextSentenceIndex];
                if (letterIndex === 0 || text === nextSentence.slice(0, text.length)) {
                    setInfo({direction: AnimationDirection.Typing, sentenceIndex: nextSentenceIndex});
                }
            }, 100);
        }

        return () => clearInterval(interval);
    }, [curState, letterIndex, sentenceIndex, defaultText, direction, sentences, state, text]);

    useEffect(() => {
        if (curState === AnimationState.Play || text == defaultText) return;

        const timeout = setTimeout(() => {
            dispatch({type: TextActions.Play});
        }, 3000);

        return () => clearTimeout(timeout);
    }, [curState, defaultText, text]);

    return {state, play, stop, setResponsive, setInfo}
}