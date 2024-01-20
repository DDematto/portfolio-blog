import Layout from "../components/General/Layout";

// Homepage Sections
import About from "../components/Homepage/About";
import Skills from "../components/Homepage/Skills";
import Education from "../components/Homepage/Education";
import Contact from "../components/Homepage/Contact";
import Projects from "../components/Homepage/Projects";
import Navigation from "../components/Homepage/Navigation";

export default function Portfolio() {
    return <Layout style={{paddingTop: "100px"}}>
        <Navigation/>
        <About/>
        <Skills/>
        <Projects/>
        <Education/>
        <Contact/>
    </Layout>
}

