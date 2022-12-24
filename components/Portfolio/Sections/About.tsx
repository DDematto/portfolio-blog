import styled from "styled-components"
import {SideBorder} from "../../General/SideBorder";
import SectionContainer from "./index";

// Svg Buttons
import SVGLink from "../../General/SVGLink";
import Github from "&/asset/svg/github.svg";
import Twitter from "&/asset/svg/twitter.svg";
import LinkedIn from "&/asset/svg/linkedin.svg";
import {motion} from "framer-motion";

export default function About() {
    const titles = ["01- About Me, Hey I'm Devin!", "01- About Me, I Enjoy: Research", "01- About Me, I Enjoy: Anime", "01- About Me, I Enjoy: Hentai"]

    return <SectionContainer titles={titles}>
        <AboutContainer>
            <ProfileContainer
                initial={{x: "-150%", opacity: 0}}
                animate={{x: 0, opacity: 1}}
                transition={{duration: 2}}
            >
                <ProfileImage src="https://picsum.photos/200"/>

                <ProfileText>Devin DeMatto</ProfileText>

                <ProfileLinks>
                    <SVGLink href={""}><Github/></SVGLink>
                    <SVGLink href={""}><Twitter/></SVGLink>
                    <SVGLink href={""}><LinkedIn/></SVGLink>
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

const ProfileImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
`;

const ProfileText = styled.h2`
  font-size: 1.5rem;
  margin: 0 auto;
`;

const ProfileLinks = styled(SideBorder)`
  padding: .5rem;
  margin: 0 auto;
  width: 75%;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 1rem;
`;


// Description section
const DescContainer = styled(SideBorder)`
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