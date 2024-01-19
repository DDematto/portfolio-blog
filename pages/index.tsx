import styled from "styled-components";

// Homepage Sections
import About from "../components/Homepage/About";
import Skills from "../components/Homepage/Skills";
import Education from "../components/Homepage/Education";
import Contact from "../components/Homepage/Contact";
import Projects from "../components/Homepage/Projects";
import Navigation from "../components/Homepage/Navigation";

export default function Portfolio() {
    return <MainContent>
        <Navigation/>
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Contact/>
    </MainContent>
}

const MainContent = styled.div`
    flex-grow: 1;
    padding-top: 100px;
    max-width: 1400px;
`