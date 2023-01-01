import styled from "styled-components"
import {motion} from "framer-motion";
import {AnimatedDIV, AnimatedIMG} from "../../AnimatedContainers";
import SectionContainer from "./index";
import profilePic from "../../../public/images/DevinDeMatto.jpg";
import GitHub from "components/Icons/Github";
import LinkedIn from "components/Icons/LinkedIn";
import Twitter from "components/Icons/Twitter";

// Svg Buttons

export default function About() {
    const titles = ["01 - About Me, Hey I'm Devin!", "01 - About Me, I Enjoy: Games"]

    const profileVariants = {
        hidden: {opacity: 0, x: "-20vw", transition: {duration: 1}},
        visible: {opacity: 1, x: 0, transition: {duration: 1}}
    }

    const DescVariants = {
        hidden: {opacity: 0, y: "20vh", transition: {duration: 1}},
        visible: {opacity: 1, y: 0, transition: {duration: 1}}
    }

    return <SectionContainer titles={titles} id="about">
        <AboutContainer>
            <ProfileContainer variants={profileVariants} initial="hidden" animate="visible">
                <ProfileImage src={profilePic} width={200} height={200} alt="Picture of Devin DeMatto"/>

                <ProfileText>Devin DeMatto</ProfileText>

                <ProfileLinks>
                    <a target="new" href="https://github.com/DDematto"><GitHub size={64}/></a>
                    <a target="new" href="https://twitter.com/DevinDematto"><Twitter size={64}/></a>
                    <a target="new" href="https://www.linkedin.com/in/devin-dematto-60a48718b/"><LinkedIn
                        size={64}/></a>
                </ProfileLinks>
            </ProfileContainer>

            <DescContainer variants={DescVariants} initial="hidden" animate="visible">
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;