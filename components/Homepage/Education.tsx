import Section from "./Section";
import {TextContainer} from "../General/TextContainer";
import {useInView} from 'react-intersection-observer';
import {motion} from 'framer-motion';
import {exitDuration, inViewForAnimate, startDuration} from "../General/Layout";

export default function Education() {
    const titles = ["04 - Education - Always Learning", "04 - Education - Something New Everyday"];

    const textVariants = {
        hidden: {opacity: 0, y: 30, transition: {duration: startDuration, ease: "easeOut"}},
        visible: {opacity: 1, y: 0, transition: {duration: startDuration, ease: "easeOut"}},
        exit: {opacity: 0, y: 30, transition: {duration: exitDuration, ease: "easeIn"}}
    };

    const [ref, inView] = useInView({threshold: inViewForAnimate, triggerOnce: true});
    return <Section defaultText="04 - Education" titles={titles} height="50vh" id="education" ref={ref}>
        <motion.div variants={textVariants} initial="hidden" animate={inView ? "visible" : "hidden"} exit="exit">
            <TextContainer>
                <p>
                    As a CSE student at Michigan State University, I am always looking for new opportunities to learn
                    and
                    challenge myself. I believe that continuous learning is essential for personal and professional
                    growth,
                    and am always eager to learn about new technologies and approaches. I am currently working on my
                    bachelors in Computer Science Engineering at MSU, and am excited to see what the future holds.
                    Whether
                    through coursework, online resources, or personal projects, I am always looking for ways to push
                    myself
                    and grow as a developer.
                </p>
            </TextContainer>
        </motion.div>
    </Section>
}