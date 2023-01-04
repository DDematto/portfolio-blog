import SectionContainer from "./index";
import {AnimatedDIV} from "../AnimatedContainers";
import styled from "styled-components";
import {useState} from "react";
import {motion} from "framer-motion";
import VerticalList from "../VerticalList";

// Icon Imports
import {
    DiBootstrap,
    DiGithubBadge,
    DiJavascript1,
    DiPostgresql,
    DiPython,
    DiReact,
    DiTrello,
    DiVisualstudio
} from "react-icons/di";
import {
    SiCplusplus,
    SiCsharp,
    SiDjango,
    SiExpress,
    SiMicrosoftexcel,
    SiMysql,
    SiNodedotjs,
    SiPostman,
    SiPycharm,
    SiTypescript,
    SiWebstorm
} from "react-icons/si";
import {AiFillHtml5} from "react-icons/ai";
import {IoLogoCss3} from "react-icons/io";
import {TbBrandNextjs} from "react-icons/tb";
import {FaGitSquare} from "react-icons/fa";
import IconGallery from "../IconGallery";

export default function Skills() {
    const titles = ["02 - Skills - Languages", "02 - Skills - Frameworks", "02 - Skills - Tools", "02 - Skills - Databases", "02 - Skills - Other"];
    const categories = ["Languages", "Frameworks", "Tools", "Databases", "Other"];
    const [category, setCategory] = useState(categories[0]);

    const skillVariants = {
        hidden: {opacity: 0, transition: {duration: 1}},
        visible: {opacity: 1, transition: {duration: 1}}
    }

    return <SectionContainer titles={titles} id="skills">
        <SkillsDesc variants={skillVariants} initial="hidden" animate="visible">
            <p>I am always looking for new ways to challenge myself and improve as a software developer. This includes
                staying up-to-date with the latest technologies and frameworks, as well as seeking out opportunities to
                learn and grow through coursework, online resources, and professional development events. I believe that
                continuous learning is essential for any professional in the tech industry, as it allows me to stay
                current and relevant in an ever-changing field. I am excited to continue building my skills and
                expertise and contributing to the success of my team and organization.
            </p>
        </SkillsDesc>

        <SkillsContainer variants={skillVariants} initial="hidden" animate="visible">
            <VerticalList items={categories} grabCurrentItem={setCategory}/>

            <IconGallery Icons={Icons(category) || []}/>
        </SkillsContainer>
    </SectionContainer>
}

const Icons = (category: string) => {
    switch (category) {
        case "Languages":
            return [
                {color: "#FFFF00", name: "JavaScript", SVG: <DiJavascript1/>},
                {color: "#007acc", name: "TypeScript", SVG: <SiTypescript/>},
                {color: "#fbcb24", name: "Python", SVG: <DiPython/>},
                {color: "#800080", name: "C#", SVG: <SiCsharp/>},
                {color: "#00599c", name: "C++", SVG: <SiCplusplus/>},
                {color: "", name: "HTML", SVG: <AiFillHtml5/>},
                {color: "#264de4", name: "CSS", SVG: <IoLogoCss3/>},
            ];
        case "Frameworks":
            return [
                {color: "#61dafb", name: "React", SVG: <DiReact/>},
                {color: "", name: "Next.js", SVG: <TbBrandNextjs/>},
                {color: "", name: "Node", SVG: <SiNodedotjs/>},
                {color: "", name: "Express", SVG: <SiExpress/>},
                {color: "", name: "Django", SVG: <SiDjango/>},
                {color: "", name: "Bootstrap", SVG: <DiBootstrap/>},
            ];
        case "Tools":
            return [
                {color: "", name: "Git", SVG: <FaGitSquare/>},
                {color: "", name: "GitHub", SVG: <DiGithubBadge/>},
                {color: "", name: "PyCharm", SVG: <SiPycharm/>},
                {color: "", name: "WebStorm", SVG: <SiWebstorm/>},
                {color: "", name: "Visual Studio", SVG: <DiVisualstudio/>},
                {color: "", name: "Postman", SVG: <SiPostman/>},
            ];
        case "Databases":
            return [
                {color: "#f29111", name: "MySQL", SVG: <SiMysql/>},
                {color: "", name: "PostgresSQL", SVG: <DiPostgresql/>},
            ];
        case "Other":
            return [
                {color: "lightblue", name: "Trello", SVG: <DiTrello/>},
                {color: "#21a366", name: "Microsoft Excel", SVG: <SiMicrosoftexcel/>},
            ];
    }
};

// Main Containers for the Skills Section
const SkillsDesc = styled(AnimatedDIV)`
  word-spacing: 0.1rem;
`

const SkillsContainer = styled(motion.div)`
  min-height: 300px;
  width: 95%;
  margin: 0 auto;

  display: grid;
  grid-template-columns: .25fr 1fr;
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 0;
    width: 100%;
  }
`