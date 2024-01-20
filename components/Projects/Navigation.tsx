import Link from 'next/link';
import styled from 'styled-components'
import {motion} from 'framer-motion'
import {exitDuration, startDuration} from "../General/Layout";

export default function Navigation(props: { href: string, name: string }) {
    const {href, name} = props;

    const navigationVariants = {
        hidden: {x: '100vw', opacity: 0},
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: startDuration
            }
        },
        exit: {
            x: '-100vw',
            opacity: 0,
            transition: {
                duration: exitDuration
            }
        }
    };

    return <ProjectNavigation variants={navigationVariants} initial="hidden" animate="visible" exit="exit">
        <Link href={href} passHref>
            <Back>{name}</Back>
        </Link>
    </ProjectNavigation>
}


const ProjectNavigation = styled(motion.nav)`
    width: 100%;
    padding: 1rem 2rem;
    background-color: ${({theme}) => theme.colors.background};
    color: white;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 1rem;
`;

const Back = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-decoration: none;
    cursor: pointer;

    &::before {
        content: "<--";
        display: inline-block;
        margin-right: 8px;
    }
`;
