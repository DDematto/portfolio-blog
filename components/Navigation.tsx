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
        if (router.pathname == "/") {
            categoryLogic();

            window.addEventListener("scroll", categoryLogic);
        } else {
            setActive("projects");
            setProgress(0);
        }

        return () => window.removeEventListener("scroll", categoryLogic);
    }, [categoryLogic, router.pathname]);

    const variants = {hidden: {y: -65, transition: {duration: 0.1}}, visible: {y: 0, transition: {duration: 0.1}}}

    return <Nav ref={navRef} variants={variants} animate="visible" initial='hidden'>
        <Wrapper ref={wrapperRef}>
            <SectionLink id="about" title="01 - About" active={active == "about"}/>
            <SectionLink id="skills" title="02 - Skills" active={active == "skills"}/>
            <SectionLink id="education" title="03 - Education" active={active == "education"}/>
            <SectionLink id="contact" title="04 - Contact" active={active == "contact"}/>
        </Wrapper>
        <LinkStyled scroll={true} href='/projects' active={active == "projects" ? 1 : 0}>Projects</LinkStyled>
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


  @media (max-width: 700px) {
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
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

// SectionLink component
function SectionLink(props: { title: string, id: string, active: boolean }) {
    const {title, id, active} = props;

    return <div>
        <LinkStyled scroll={true} href={`/#${id}`} active={active ? 1 : 0}>
            {title}
        </LinkStyled>
    </div>
}

const LinkStyled = styled(Link)<{ active: number }>`
  color: ${({theme}) => theme.text.highlight};
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  text-align: center;
  outline: 1px solid transparent;

  &:hover, &:focus {
    color: ${({theme}) => theme.text.secondary};;
  }

  ${({active}) => active && css`
    color: ${({theme}) => theme.text.primary};
    background-color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.secondary};
    border-radius: 5px;
    padding: 0.5rem 1rem;
  `}

`