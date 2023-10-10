import SectionContainer from "./index";
import Button from "../Projects/Button";

export default function Projects() {
    const titles = ["03 - Projects - Always Learning", "03 - Projects - Something New Everyday"];

    return <SectionContainer defaultText="03 - Projects" titles={titles} height="50vh" id="projects">
        <Button/>
        <p>Cool Diagrams and Button Here</p>
    </SectionContainer>
}