import styled from "styled-components";

// Portfolio Sections
import About from "components/Portfolio/About";
import Skills from "components/Portfolio/Skills";
import Education from "components/Portfolio/Education";
import Contact from "components/Portfolio/Contact";
import Projects from "../components/Portfolio/Projects";


export default function Portfolio() {
    return <>
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Contact/>
    </>
}

