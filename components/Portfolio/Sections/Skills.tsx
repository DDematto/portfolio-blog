import SectionContainer from "./index";
import {AnimatedDIV} from "../../General/AnimatedContainers";
import styled from "styled-components";
import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";

// Icon Imports https://react-icons.github.io/react-icons
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

const navHeight = 40;

export default function Skills() {
    const titles = ["03 - Skills - Languages", "03 - Skills - Frameworks", "03 - Skills - Tools", "03 - Skills - Databases", "03 - Skills - Other"];
    const categories = ["Frameworks", "Tools", "Databases", "Other"];

    const navRef = useRef<HTMLDivElement>(null);
    const [category, setCategory] = useState("Languages");
    const [top, setTop] = useState(0);
    const [hasEntered, setHasEntered] = useState(false);

    const initialRef = useRef<HTMLButtonElement>(null);
    const [categoryReference, setCategoryReference] = useState<HTMLButtonElement>();

    // Assign the category reference to the initial reference
    useEffect(() => {
        if (!initialRef.current) return;
        setCategoryReference(initialRef.current);
        setTop(initialRef.current.offsetTop);
    }, [initialRef]);

    //  Category Logic
    const setCategoryLogic = (e: any) => {
        setCategory(e.target.innerText);
        setTop(e.target.offsetTop);
        setCategoryReference(e.target);
    }

    const categoryEnterLogic = (e: any) => {
        if (!navRef.current) return;
        setHasEntered(true);

        const y = (e.clientY - navRef.current.getBoundingClientRect().top) - (navHeight / 2);

        // Check if the navBar  is going to be out of bounds
        if (y < 0) return setTop(0);
        if (y > navRef.current.clientHeight - navHeight) return setTop(navRef.current.clientHeight - navHeight);
        setTop(y);
    }

    const CategoryLeaveLogic = () => {
        if (!categoryReference) return;
        setHasEntered(false);

        const y = categoryReference.getBoundingClientRect().top - navRef.current!.getBoundingClientRect().top;
        setTop(y);
    }

    return <SectionContainer titles={titles}>
        <SkillsDesc initial={{y: "100%", opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 2}}>
            <p>I am always looking for new ways to challenge myself and improve as a software developer. This includes
                staying up-to-date with the latest technologies and frameworks, as well as seeking out opportunities to
                learn and grow through coursework, online resources, and professional development events. I believe that
                continuous learning is essential for any professional in the tech industry, as it allows me to stay
                current and relevant in an ever-changing field. I am excited to continue building my skills and
                expertise and contributing to the success of my team and organization.
            </p>
        </SkillsDesc>

        <SkillsContainer>
            <CategoryNav ref={navRef} onMouseMove={(e) => categoryEnterLogic(e)}
                         onMouseLeave={() => CategoryLeaveLogic()}
                         initial={{x: "-150%", opacity: 0}}
                         animate={{x: 0, opacity: 1}}
                         transition={{duration: 2}}
            >

                <Category ref={initialRef} isActive={category === "Languages"} onClick={(e) => setCategoryLogic(e)}>
                    Languages
                </Category>

                {categories.map((cat, index) => {
                    return <Category key={index} isActive={category === cat} onClick={(e) => setCategoryLogic(e)}>
                        {cat}
                    </Category>
                })}

                <CategoryIndicator style={{top: top, left: 0}}/>
                <CategoryIndicator style={{top: top, right: 0}}/>
            </CategoryNav>

            <SkillList initial={{translateY: "100%", opacity: 0}} animate={{translateY: 0, opacity: 1}}
                       transition={{duration: 2}}>

                {currentCategory(category)!.map((skill, i) => {
                        return <Skill key={skill.name} name={skill.name} Icon={skill.icon} color={skill.color} i={i}/>
                    }
                )}


            </SkillList>
        </SkillsContainer>
    </SectionContainer>
}

const currentCategory = (category: string) => {
    switch (category) {
        case "Languages":
            return [
                {color: "#FFFF00", name: "JavaScript", icon: <DiJavascript1/>},
                {color: "#007acc", name: "TypeScript", icon: <SiTypescript/>},
                {color: "#fbcb24", name: "Python", icon: <DiPython/>},
                {color: "#800080", name: "C#", icon: <SiCsharp/>},
                {color: "#00599c", name: "C++", icon: <SiCplusplus/>},
                {color: "", name: "HTML", icon: <AiFillHtml5/>},
                {color: "#264de4", name: "CSS", icon: <IoLogoCss3/>},
            ];
        case "Frameworks":
            return [
                {color: "#61dafb", name: "React", icon: <DiReact/>},
                {color: "", name: "Next.js", icon: <TbBrandNextjs/>},
                {color: "", name: "Node", icon: <SiNodedotjs/>},
                {color: "", name: "Express", icon: <SiExpress/>},
                {color: "", name: "Django", icon: <SiDjango/>},
                {color: "", name: "Bootstrap", icon: <DiBootstrap/>},
            ];
        case "Tools":
            return [
                {color: "", name: "Git", icon: <FaGitSquare/>},
                {color: "", name: "GitHub", icon: <DiGithubBadge/>},
                {color: "", name: "PyCharm", icon: <SiPycharm/>},
                {color: "", name: "WebStorm", icon: <SiWebstorm/>},
                {color: "", name: "Visual Studio", icon: <DiVisualstudio/>},
                {color: "", name: "Postman", icon: <SiPostman/>},
            ];
        case "Databases":
            return [
                {color: "#f29111", name: "MySQL", icon: <SiMysql/>},
                {color: "", name: "PostgresSQL", icon: <DiPostgresql/>},
            ];
        case "Other":
            return [
                {color: "lightblue", name: "Trello", icon: <DiTrello/>},
                {color: "#21a366", name: "Microsoft Excel", icon: <SiMicrosoftexcel/>},
            ];
    }
};


// Main Containers for the Skills Section
const SkillsDesc = styled(AnimatedDIV)`
  padding: 1rem;
  word-spacing: 0.1rem;
`

const SkillsContainer = styled.div`
  min-height: 300px;
  width: 90%;
  padding: 1rem;
  margin: 0 auto;

  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    padding: 0;
    width: 100%;
  }
`

// Navigation Bar Styles
const CategoryNav = styled(motion.nav)`
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  padding: 1rem;

  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);

  border-top: 1px solid white;
  border-bottom: 1px solid white;
`

const Category = styled.button<{ isActive: boolean }>`
  flex: 1;

  border: none;
  font-size: 1.25rem;
  font-style: italic;

  cursor: pointer;
  background-color: transparent;
  color: white;
`

const CategoryIndicator = styled.div`
  position: absolute;
  width: 1px;
  height: ${navHeight}px;
  background-color: white;
`

// Skill List Styles
const SkillList = styled(AnimatedDIV)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;

  justify-items: center;
  align-items: center;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`

const Skill = ({i, name, Icon, color}: { i: number, name: string, Icon: JSX.Element, color: string }) => {
    return <SkillContainer
        initial={{opacity: 0, translateX: -10, translateY: -10}}
        animate={{opacity: 1, translateX: 0, translateY: 0}}
        transition={{duration: 0.3, delay: i * 0.3}}
        style={{color: color}}
    >
        {Icon}
        <p>{name}</p>
    </SkillContainer>
}

const SkillContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  // make Icon bigger
  svg {
    width: 3rem;
    height: 3rem;
  }
`
