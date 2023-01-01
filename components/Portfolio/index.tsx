import styled from "styled-components";

// Portfolio Sections
import About from "./Sections/About";
import Contact from "./Sections/Contact";
import Skills from "./Sections/Skills";
import Education from "./Sections/Education";

export default function Portfolio() {
    return <PortfolioLayout>
        <About/>
        <Skills/>
        <Education/>
        <Contact/>
    </PortfolioLayout>
}

const PortfolioLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
