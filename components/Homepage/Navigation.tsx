import Link from 'next/link'
import {useRouter} from 'next/router'
import {motion} from "framer-motion";
import {useCallback, useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";
import {exitDuration, startDuration} from "../General/Layout";

const categories = ["about", "skills", "projects", "education", "contact"];

export default function Navigation() {
    const router = useRouter();
    const [active, setActive] = useState("about");
    const [progress, setProgress] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Category Logic
    const categoryLogic = useCallback(() => {
        let sum = 0;
        let activeSection = "about";

        // grab the section data
        const sections = categories.map((section) => {
            const sectionEl = document.getElementById(section);
            if (!sectionEl) return;

            const scrollPosition = window.scrollY + window.innerHeight;
            const sectionTop = sectionEl.offsetTop;
            const sectionBottom = sectionTop + sectionEl.offsetHeight;

            // create a normalized value of the scrollPosition between 0 and 1 for each section (Progress Bar)
            const value = Math.min(Math.max((scrollPosition - sectionTop) / (sectionBottom - sectionTop), 0), 1);
            return {name: section, value};
        });

        // Calculate the progress bar value, and get the active section
        sections.forEach((section) => {
            if (!section) return;
            sum += section.value
            if (section.value > (window.innerWidth >= 700 ? 0.5 : 0.2)) {
                activeSection = section.name;
            }
        });

        setProgress(sum * (wrapperRef.current?.offsetWidth! / sections.length));
        setActive(activeSection);
    }, []);

    useEffect(() => {
        categoryLogic();
        window.addEventListener("scroll", categoryLogic);
        return () => window.removeEventListener("scroll", categoryLogic);
    }, [categoryLogic, router.pathname]);

    // Set up Animation for Nav
    const variants = {
        hidden: {
            y: -150,
            transition: {duration: exitDuration}
        },
        visible: {
            y: 0,
            transition: {duration: startDuration}
        },
        exit: {y: -150, transition: {duration: exitDuration}}
    };

    return <Nav ref={navRef} variants={variants} animate="visible" initial='hidden' exit='exit'>
        <Wrapper ref={wrapperRef}>
            <SectionLink id="about" title="01 - About" active={active == "about"}/>
            <SectionLink id="skills" title="02 - Skills" active={active == "skills"}/>
            <SectionLink id="projects" title="03 - Projects" active={active == "projects"}/>
            <SectionLink id="education" title="04 - Education" active={active == "education"}/>
            <SectionLink id="contact" title="05 - Contact" active={active == "contact"}/>
        </Wrapper>
        <Line style={{
            left: `${wrapperRef.current?.getBoundingClientRect().left}px`,
            width: `${progress}px`
        }}/>
    </Nav>
}

// styled components
const Nav = styled(motion.nav)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    min-height: 80px;
    background-color: ${({theme}) => theme.colors.background};
    border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
    z-index: 1000;

    display: flex;
    align-items: center;
    justify-content: space-around;


    @media (max-width: 800px) {
        display: none;
    }
`

const Line = styled(motion.div)`
    position: absolute;
    bottom: 2px;
    height: 2px;
    border-radius: 2px;
    background-color: white;
    backdrop-filter: blur(10px);
    z-index: -1;
`

const Wrapper = styled.div`
    width: 80%;
    height: 20px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;

    & > * {
        width: 100%;
    }

    @media (max-width: 700px) {
        margin-top: 0.5rem;

        display: grid;
        grid-template-columns: repeat(2, 1fr);
        flex-direction: column;
        gap: 1.5rem;
    }
`

// Section Link Component
function SectionLink(props: { title: string, id: string, active: boolean }) {
    const {title, id, active} = props;
    const router = useRouter();

    function adjustScroll(id: string) {
        setTimeout(() => {
            const sectionElement = document.getElementById(id);
            if (!sectionElement) return;

            const offsetTop = sectionElement.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }, 1);
    }


    type KeySectionMap = {
        [key: string]: string;
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Define your key-section mapping with type
            const keySectionMap: KeySectionMap = {
                '1': 'about',
                '2': 'skills',
                '3': 'projects',
                '4': 'education',
                '5': 'contact',
            };

            // Check if the pressed key is in your map
            const sectionId = keySectionMap[e.key];
            if (sectionId) {
                adjustScroll(sectionId);
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Adjust scroll on component mount (after everything is loaded)
    useEffect(() => {
        if (!window.location.hash) return;
        const hashId = window.location.hash.substring(1);
        adjustScroll(hashId);
    }, []);

    // Listen for route changes in Next.js
    useEffect(() => {
        function handleRouteChangeComplete(url: string) {
            if (url.includes('#')) {
                const hashId = url.split('#')[1];
                adjustScroll(hashId);
            }
        }

        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        return () => router.events.off('routeChangeComplete', handleRouteChangeComplete);
    }, [router.events]);

    function handleScrollToSection(e: any, id: any) {
        e.preventDefault();
        router.push(`/#${id}`, undefined, {scroll: false}).then(() => adjustScroll(id));
    }


    return <div>
        <LinkStyled href={`/#${id}`} scroll={true} active={active ? 1 : 0}
                    onClick={(e) => handleScrollToSection(e, id)}>
            {title}
        </LinkStyled>
    </div>
}

const LinkStyled = styled(Link)<{ active: number }>`
    height: 100%;
    color: ${({theme}) => theme.text.highlight};
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    white-space: nowrap;
    text-align: center;
    outline: 1px solid transparent;
    padding: 0.5rem 1rem;

    &:hover, &:focus {
        color: ${({theme}) => theme.text.secondary};
    }

    ${({active}) => active && css`
        color: ${({theme}) => theme.text.primary};
        background-color: ${({theme}) => theme.colors.primary};
        border: 1px solid ${({theme}) => theme.colors.secondary};
        border-radius: 5px;
    `}
`