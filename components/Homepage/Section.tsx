import React, {forwardRef} from 'react';
import styled from "styled-components"
import useAnimatedText from "../General/AnimatedText";
import {motion} from "framer-motion";
import {exitDuration, startDuration} from "../General/Layout";

interface SectionContainerProps {
    id: string;
    titles: string[];
    defaultText: string;
    children: React.ReactNode;
    height?: string;
}

const Section = forwardRef<HTMLDivElement, SectionContainerProps>((props, ref) => {
    const {titles, defaultText, children, height, id} = props;
    const {state: {text}} = useAnimatedText({titles, defaultTxt: defaultText});

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {opacity: 1, transition: {duration: startDuration}},
        exit: {opacity: 0, transition: {duration: exitDuration}}
    };

    return <Container height={height || "90vh"} id={id} ref={ref}>
        <TextContainer variants={containerVariants} animate="visible" initial='hidden' exit='exit'>
            {text.split(' ').map((char: string, index: number) => (
                <h1 key={char + index}>
                    {index !== 0 && "\u00A0"}
                    {char}
                </h1>
            ))}
            <Cursor symbol="|"/>
        </TextContainer>
        {children}
    </Container>
});


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

const Container = styled.div<{ height: string }>`
    padding: 0 2rem;
    width: 100%;
    min-height: ${({height}) => height};
    margin-bottom: 3rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const TextContainer = styled(motion.span)`
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

Section.displayName = 'Section';
export default Section;
