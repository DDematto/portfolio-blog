import Section from "./index";
import {AnimatedContainer} from "../AnimatedContainers";

export default function Education() {
    const titles = ["04 - Education - Always Learning", "04 - Education - Something New Everyday"];

    return <Section defaultText="04 - Education" titles={titles} height="50vh" id="education">
        <AnimatedContainer>
            <p>
                As a CSE student at Michigan State University, I am always looking for new opportunities to learn and
                challenge myself. I believe that continuous learning is essential for personal and professional growth,
                and am always eager to learn about new technologies and approaches. I am currently working on my
                bachelors in Computer Science Engineering at MSU, and am excited to see what the future holds. Whether
                through coursework, online resources, or personal projects, I am always looking for ways to push myself
                and grow as a developer.
            </p>
        </AnimatedContainer>

    </Section>
}