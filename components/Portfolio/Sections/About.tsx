import styled from "styled-components"
import {motion} from "framer-motion";
import {AnimatedDIV, AnimatedIMG} from "../../General/AnimatedContainers";
import SectionContainer from "./index";
import profilePic from "../../../public/DevinDeMatto.jpg";
import GitHub from "../../Icons/Github";
import Twitter from "../../Icons/Twitter";
import LinkedIn from "../../Icons/LinkedIn";

// Svg Buttons

export default function About() {
    const titles = ["01- About Me, Hey I'm Devin!", "01- About Me, I Enjoy: Games"]

    return <SectionContainer titles={titles}>
        <AboutContainer>
            <ProfileContainer
                initial={{x: "-150%", opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 2}}
            >
                <ProfileImage src={profilePic} width={200} height={200} alt="Picture of Devin DeMatto"/>

                <ProfileText>Devin DeMatto</ProfileText>

                <ProfileLinks>
                    <GitHub width={64} height={64}/>
                    <Twitter width={64} height={64}/>
                    <LinkedIn width={64} height={64}/>
                </ProfileLinks>
            </ProfileContainer>

            <DescContainer
                initial={{y: "100%", opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 2}}
            >
                <Section>
                    <h2>Professional Background</h2>
                    <p>I have always been passionate about programming and have been
                        fortunate enough to turn that
                        passion
                        into
                        a career. I am currently working on my Bachelors in Computer Science Engineering at Michigan
                        State
                        University and am looking for more experience in the way of internships and co-ops.</p>
                </Section>

                <Section>
                    <h2>Interests</h2>
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
    </SectionContainer>
}

// Main section
const AboutContainer = styled.section`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 1rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

// Profile section
const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ProfileImage = styled(AnimatedIMG)`
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
`;

const ProfileText = styled.h2`
  font-size: 1.5rem;
  margin: 0 auto;
`;

const ProfileLinks = styled.div`
  padding: .5rem;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;


// Description section
const DescContainer = styled(AnimatedDIV)`
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
`;