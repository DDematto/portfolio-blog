import Link from 'next/link'
import {useRouter} from 'next/router'
import {motion} from "framer-motion";
import {useCallback, useEffect, useRef, useState} from "react";
import styled, {css} from "styled-components";

const categories = ["about", "skills", "education", "contact"];

export default function Navigation() {
    const router = useRouter();
    const [active, setActive] = useState("about");
    const [progress, setProgress] = useState(0);
    const navRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const styleRef = useRef<{ left: string, width: string }>({left: '0', width: '0'});

    // Category Logic
    const categoryLogic = useCallback(() => {
        let sum = 0;
        let activeSection = "about";

        // grab the section data
        const sections = categories.map((section) => {
            const sectionEl = document.getElementById(section)!;
            const scrollPosition = window.scrollY + window.innerHeight;
            const sectionTop = sectionEl.offsetTop;
            const sectionBottom = sectionTop + sectionEl.offsetHeight;

            // create a normalized value of the scrollPosition between 0 and 1 for each section (Progress Bar)
            const value = Math.min(Math.max((scrollPosition - sectionTop) / (sectionBottom - sectionTop), 0), 1);
            return {name: section, value};
        });

        // Calculate the progress bar value, and get the active section
        sections.forEach((section) => {
            sum += section.value
            if (section.value > 0.5) {
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
    }, []);

    // Reset the progress bar when the user clicks on a different page
    useEffect(() => {
        if (router.pathname === "/") return;

        setActive("projects");
        setProgress(0);
    }, [router.pathname]);

    useEffect(() => {
        styleRef.current = {
            left: `${wrapperRef.current?.getBoundingClientRect().left}px`,
            width: `${progress}px`
        };
    }, [progress]);

    const variants = {
        hidden: {y: -65, transition: {duration: 0.1}},
        visible: {y: 0, transition: {duration: 0.1}},
    }

    return <Nav ref={navRef} variants={variants} animate="visible" initial='hidden'>
        <Wrapper ref={wrapperRef}>
            <SectionLink id="about" title="01 - About" active={active == "about"}/>
            <SectionLink id="skills" title="02 - Skills" active={active == "skills"}/>
            <SectionLink id="education" title="03 - Education" active={active == "education"}/>
            <SectionLink id="contact" title="04 - Contact" active={active == "contact"}/>
        </Wrapper>
        <LinkStyled scroll={true} href='/projects' active={active == "projects" ? 1 : 0}>Projects</LinkStyled>
        <Line style={styleRef.current}/>
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


  @media (max-width: 768px) {
    padding: 0;
  }

  @media (max-width: 400px) {
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
`

const Line = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  z-index: -1;

  @media (max-width: 800px) {
    display: none;
  }
`


const Wrapper = styled.div`
  width: 80%;
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-align: center;

  & > * {
    width: 100%;
  }

  // when media is small enough, change the flex-direction to column
  @media (max-width: 800px) {
    display: grid;

    align-items: center;
    grid-template-columns: repeat(2, 1fr);

    gap: 1rem;
  }

  @media (max-width: 400px) {
    display: flex;
    flex-direction: column;
  }
`

// SectionLink component
function SectionLink(props: { title: string, id: string, active: boolean }) {
    const {title, id, active} = props;

    return <div>
        <LinkStyled scroll={true} href={`/#${id}`} active={active ? 1 : 0}>{title}</LinkStyled>
    </div>
}

const LinkStyled = styled(Link)<{ active: number }>`
  color: ${({theme}) => theme.text.highlight};
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-style: italic;
  white-space: nowrap;
  outline: none;
  text-align: center;
  border: 0;

  &:hover, &:focus {
    color: ${({theme}) => theme.text.secondary};;
  }

  ${({active}) => active && css`
    color: ${({theme}) => theme.text.primary};
    background-color: ${({theme}) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({theme}) => theme.colors.secondary};
    border-radius: 5px;
    padding: 0.5rem 1rem;
  `}

`