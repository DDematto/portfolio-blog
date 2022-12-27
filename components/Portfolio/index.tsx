import styled from "styled-components";

// Portfolio Sections
import About from "./Sections/About";
import Experience from "./Sections/Experience";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills"
import Contact from "./Sections/Contact"

export default function Portfolio() {
    return <PortfolioLayout>
        <About/>
        <Experience/>
        <Projects/>
        <Skills/>
        <Contact/>
    </PortfolioLayout>
}

const PortfolioLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
