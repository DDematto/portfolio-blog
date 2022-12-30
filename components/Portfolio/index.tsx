import styled from "styled-components";

// Portfolio Sections
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Projects from "./Sections/Projects";
import Skills from "./Sections/Skills";

export default function Portfolio() {
    return <PortfolioLayout>
        <About/>
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
