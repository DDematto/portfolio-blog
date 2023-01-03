import dynamic from 'next/dynamic';
import styled from "styled-components";

// Portfolio Sections
import About from "./Sections/About";


const SkillsSection = dynamic(() => import('./Sections/Skills'), {ssr: false});
const EducationSection = dynamic(() => import('./Sections/Education'), {ssr: false});
const ContactSection = dynamic(() => import('./Sections/Contact'), {ssr: false});


export default function Portfolio() {
    return <PortfolioLayout>
        <About/>
        <SkillsSection/>
        <EducationSection/>
        <ContactSection/>
    </PortfolioLayout>
}

const PortfolioLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
