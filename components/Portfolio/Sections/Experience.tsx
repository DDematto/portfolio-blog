import styled from "styled-components";
import SectionContainer from "."


export default function Experience() {
    const titles = ["02- Experience, Organizations", "02- Experience, Competitions"]

    return <SectionContainer titles={titles}>
        <ExperienceContainer>
            <h2>Organizations</h2>
            <p>Coming Soon!</p>
        </ExperienceContainer>
    </SectionContainer>
}

const ExperienceContainer = styled.section`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;


  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

