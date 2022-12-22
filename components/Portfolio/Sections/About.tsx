import styled, {keyframes} from "styled-components"
import {SideBorder} from "../../General/SideBorder";

export default function About() {


    return <AboutContainer>
        <ProfileContainer>
            <ProfileImage src="https://picsum.photos/200"/>
            <ProfileLinks>
                <p>Github</p>
                <p>Github</p>
                <p>Github</p>
            </ProfileLinks>
        </ProfileContainer>

        <DescContainer>
            <Section>
                <h1>Professional Background</h1>
                <p>I have always been passionate about programming and have been
                    fortunate enough to turn that
                    passion
                    into
                    a career. I am currently working on my Bachelors in Computer Science Engineering at Michigan
                    State
                    University and am looking for more experience in the way of internships and co-ops.</p>
            </Section>

            <Section>
                <h1>Interests</h1>
                <p>I am a passionate and driven individual with a strong interest in technology and programming. In
                    my
                    free
                    time, I enjoy playing video games and working on side projects to learn new technologies. I am
                    always
                    looking for ways to challenge myself and grow personally and professionally, and I am excited to
                    see
                    what the future holds. Thank you for visiting my website and learning more about me.</p>
            </Section>
        </DescContainer>
    </AboutContainer>
}

// Main section
const AboutContainer = styled.section`
  width: 100%;
  height: 500px;
  padding: 1rem 5rem;
  gap: 2.5rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;


// Profile section
const ProfileContainer = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: 1rem;
  padding: 1rem;
  align-items: stretch;
`;

const ProfileImage = styled.img`
  width: 200px;
  height: auto;
`;

const ProfileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;


// Description section
const DescContainer = styled(SideBorder)`
  height: 100%;
  width: 80%;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  color: white;
  gap: 2rem;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    font-size: 1.5rem;
    font-weight: lighter;
    line-height: 1.5;
  }
`;