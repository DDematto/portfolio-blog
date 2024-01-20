import Section from "./Section";
import styled, {keyframes} from 'styled-components';
import {AiFillProject} from 'react-icons/ai';
import Link from 'next/link'
import GitHubStats from "../General/GithubStats";
import LeetcodeStats from "../General/LeetcodeStats";
import {useInView} from 'react-intersection-observer';
import {exitDuration, inViewForAnimate, startDuration} from "../General/Layout";
import {motion} from 'framer-motion';

export default function Projects() {
    const titles = ["03 - Projects - What I Enjoy", "03 - Projects - Always WIP"];

    // Define animation variants
    const buttonVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: startDuration, ease: "easeOut" }},
        exit: { opacity: 0, y: 30, transition: { duration: exitDuration, ease: "easeIn" }}
    };

    const rowVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: { opacity: 1, x: 0, transition: { duration: startDuration, ease: "easeOut" }},
        exit: { opacity: 0, x: 30, transition: { duration: exitDuration, ease: "easeIn" }}
    };

    const [ref, inView] = useInView({threshold: inViewForAnimate, triggerOnce: true});
    return <Section defaultText="03 - Projects" titles={titles} height="50vh" id="projects" ref={ref}>
        <Container>
            <motion.div variants={buttonVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <Button href='/projects' scroll={false}>
                    <AiFillProject/> View All Projects
                </Button>
            </motion.div>

            <motion.div variants={rowVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <TopRow>
                    <GitHubStats/>
                    <LeetcodeStats/>
                </TopRow>
            </motion.div>
        </Container>
    </Section>
}

const Container = styled.div`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    min-height: 50vh;
`;

const pulse = keyframes`
    0% {
        box-shadow: 0 0 8px #0075e0;
    }
    50% {
        box-shadow: 0 0 12px #0075e0;
    }
    100% {
        box-shadow: 0 0 8px #0075e0;
    }
`;

const Button = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 42px;
    width: 100%;
    cursor: pointer;
    outline: none;
    border: none;
    background: linear-gradient(90deg, ${({theme}) => theme.colors.accentStart}, ${({theme}) => theme.colors.accentEnd});
    color: ${({theme}) => theme.text.primary};
    transition: all 0.5s ease;
    animation: ${pulse} 2s infinite;

    &:hover {
        background: linear-gradient(60deg, ${({theme}) => theme.colors.accentStart}, ${({theme}) => theme.colors.accentEnd});
        box-shadow: none;
        transform: scale(1.03);
    }
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;

