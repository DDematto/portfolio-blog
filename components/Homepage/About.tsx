import styled from "styled-components";
import {motion, AnimatePresence} from "framer-motion";
import {TextContainer} from "../General/TextContainer";
import Image from "next/legacy/image";
import Section from "./Section";
import profilePic from "../../public/DevinDeMatto.jpg";
import GitHub from "../General/Icons/Github";
import LinkedIn from "../General/Icons/LinkedIn";
import X from "../General/Icons/X";
import {exitDuration, inViewForAnimate, startDuration} from "../General/Layout";
import {useInView} from 'react-intersection-observer';
import {ResumeButton} from "../General/Footer";

export default function About() {
    const titles = ["01 - About Me, Hey I'm Devin!", "01 - About Me, I Enjoy: Games"]

    const profileVariants = {
        hidden: {opacity: 0, x: "-20vw"},
        visible: {opacity: 1, x: 0, transition: {duration: startDuration}},
        exit: {opacity: 0, x: "-20vw", transition: {duration: exitDuration}}
    };

    const descVariants = {
        hidden: {opacity: 0, y: -40, scale: 0.90, transition: {duration: startDuration, ease: "easeOut"}},
        visible: {opacity: 1, y: 0, scale: 1, transition: {duration: startDuration, ease: "easeOut"}},
        exit: {opacity: 0, y: -40, scale: 0.90, transition: {duration: exitDuration, ease: "easeIn"}}
    };

    const profileLinksVariants = {
        visible: {transition: {staggerChildren: 0.2}},
        exit: {transition: {staggerChildren: 0.1, staggerDirection: -1}}
    }

    const linkVariants = (direction: string, index: number) => {
        return {
            hidden: {
                opacity: 0,
                x: direction === 'left' ? -50 : 50, // Enter from left or right
            },
            visible: {
                opacity: 1,
                x: 0,
                transition: {
                    type: 'spring',
                    stiffness: 120,
                    delay: startDuration + index * 0.1 // Delay each link's animation start
                }
            },
            exit: {
                opacity: 0,
                x: direction === 'left' ? 50 : -50, // Exit to left or right
                transition: { duration: 0.1 }
            }
        };
    };

    const [containerRef, inView] = useInView({threshold: inViewForAnimate, triggerOnce: true});
    return <Section titles={titles} defaultText="01 - About Me" id="about" ref={containerRef}>
        <AboutContainer>
            <ProfileContainer variants={profileVariants} initial="hidden" animate={inView ? "visible" : "hidden"}
                              exit='exit'>
                <AnimatedDiv>
                    <Image
                        src={profilePic}
                        alt="Picture of Devin DeMatto"
                        layout='fill'
                        objectFit='cover'
                        sizes="100vw"
                        priority
                    />
                </AnimatedDiv>

                <ProfileText>Devin DeMatto</ProfileText>

                <AnimatePresence>
                    <ProfileLinks variants={profileLinksVariants} initial="hidden" animate="visible" exit="exit">
                        <motion.a variants={linkVariants("left", 0)} target="_blank" href="https://github.com/DDematto">
                            <GitHub size={64}/>
                        </motion.a>
                        <motion.a variants={linkVariants("right", 1)} target="_blank" href="https://twitter.com/DevinDematto">
                            <X size={64}/>
                        </motion.a>
                        <motion.a variants={linkVariants("left", 2)} target="_blank" href="https://www.linkedin.com/in/devin-dematto-60a48718b/">
                            <LinkedIn size={64}/>
                        </motion.a>
                    </ProfileLinks>
                </AnimatePresence>

            </ProfileContainer>

            <DescContainer variants={descVariants} initial="hidden" animate={inView ? "visible" : "hidden"} exit='exit'>
                <Paragraph>
                    <h2>Professional Background - <ResumeButton style={{fontSize: "18px"}}
                                                                href={'/Resume.pdf'}>Resume</ResumeButton></h2>
                    <p>I have always been passionate about programming and have been
                        fortunate enough to turn that
                        passion
                        into
                        a career. I am currently working on my Bachelors in Computer Science Engineering at Michigan
                        State
                        University and am looking for more experience in the way of internships and co-ops.</p>
                </Paragraph>

                <Paragraph>
                    <h2>Interests</h2>
                    <p>I am a passionate and driven individual with a strong interest in technology and programming.
                        In
                        my
                        free
                        time, I enjoy playing video games and working on side projects to learn new technologies. I
                        am
                        always
                        looking for ways to challenge myself and grow personally and professionally, and I am
                        excited to
                        see
                        what the future holds. Thank you for visiting my website and learning more about me.</p>
                </Paragraph>

            </DescContainer>

        </AboutContainer>
    </Section>
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
    align-items: center; // Center align items
    justify-content: center; // Center justify items (if needed)
`;


const AnimatedDiv = styled(TextContainer)`
    width: 200px; // Fixed width
    height: 200px; // Fixed height
    margin: 0 auto;
    position: relative; // Necessary for layout='fill'
    overflow: hidden; // To maintain border-radius or any other styles
`;


const ProfileText = styled.h2`
    font-size: 1.5rem;
    margin: 0 auto;
`;

const ProfileLinks = styled(motion.div)`
    width: 80%;
    padding: .5rem;
    margin: 0 auto;

    display: grid;
    justify-items: center;
    gap: 1rem;

    grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
`;


// Description section
const DescContainer = styled(TextContainer)`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

const Paragraph = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;