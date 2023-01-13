import {AnimationState, TextState} from "./state";
import {reducer} from "./reducer";
import {useEffect, useReducer} from "react";
import styled from "styled-components";
import {Cursor} from "./Cursor";

interface IAnimatedText {
    defaultText: string;
    sentences: string[];
}

export default function AnimatedText(props: IAnimatedText) {
    const {defaultText, sentences} = props;
    const [state, dispatch] = useReducer(reducer, TextState);
    const {text, animation} = state;

    // Check if The Viewport is too small to display the text
    useEffect(() => {
    }, []);

    // Animated Text Logic
    useEffect(() => {
    }, []);

    // Delay between sentences
    useEffect(() => {
        if(animation !== AnimationState.Stopped) return;




    }, []);


    return <TextContainer>
        {text.split(' ').map((char, index) => {
            return <h1 key={index}>
                {index != 0 && "\u00A0"}
                {char}
            </h1>
        })}

        <Cursor symbol="|"/>
    </TextContainer>
}

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