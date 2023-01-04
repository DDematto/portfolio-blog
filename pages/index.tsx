import styled from "styled-components";

// Portfolio Sections
import About from "components/Portfolio/About";
import Skills from "components/Portfolio/Skills";
import Education from "components/Portfolio/Education";
import Contact from "components/Portfolio/Contact";

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