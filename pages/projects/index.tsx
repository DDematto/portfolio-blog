import Fuse from 'fuse.js';
import React, {useState, useMemo} from 'react';
import Head from "next/head";
import styled from 'styled-components';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SearchFilter from '../../components/Projects/SearchFilter'
import ProjectCard, {IProject} from '../../components/Projects/ProjectCard'
import Navigation from "../../components/Projects/Navigation";
import GitHubStats from "../../components/General/GithubStats";
import LeetcodeStats from "../../components/General/LeetcodeStats";
import Layout, {exitDuration, startDuration} from "../../components/General/Layout";
import {AnimatePresence, motion} from 'framer-motion';

export default function Projects({projects}: { projects: IProject[] }) {
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<string[]>([]);

    const filteredProjects = useMemo(() => {
        const lowerCaseSearch = search.toLowerCase();
        const lowerCaseFilters = filters.map(filter => filter.toLowerCase());

        const filteredByTags = projects.filter(project =>
            lowerCaseFilters.length === 0 || project.tags.some(tag => lowerCaseFilters.includes(tag.toLowerCase()))
        );

        if (lowerCaseSearch) {
            const fuse = new Fuse(filteredByTags, {keys: ['title'], includeScore: true, isCaseSensitive: false});
            return fuse.search(lowerCaseSearch).map(result => result.item);
        }

        return filteredByTags;
    }, [search, filters, projects]);

    const cardExitDuration = exitDuration / 5;
    const containerVariants = {
        hidden: {x: '100vw', opacity: 0},
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                duration: startDuration,
            }
        },
        exit: {
            x: '-100vw',
            opacity: 0,
            transition: {
                duration: exitDuration,
                // Calculate the delay based on the total duration of children's exit animations
                delay: cardExitDuration + (cardExitDuration / filteredProjects.length) * (filteredProjects.length - 1)
            }
        }
    };

    const listVariants = {
        hidden: {
            x: '100vw',
            opacity: 0
        },
        show: {
            x: 0,
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                when: "beforeChildren", // Make sure the children animate after the list is in place
                duration: startDuration,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: exitDuration / (2 * projects.length),
                staggerDirection: -1,
                when: "afterChildren",
                duration: exitDuration / 2,
            }
        }
    };

    return <Layout>
        <Head>
            <title>Devin DeMatto | Projects</title>
        </Head>

        <Navigation href='/' name='Homepage'/>

        <Container variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <TopRow>
                <GitHubStats/>
                <LeetcodeStats/>
            </TopRow>

            <SearchFilter filters={filters} setFilters={setFilters} setSearch={setSearch}/>

            <List variants={listVariants} initial="hidden" animate="show" exit="exit">
                <AnimatePresence mode='wait'>
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} projects={filteredProjects.length}
                                     index={index} cardExitDuration={cardExitDuration}/>))}
                </AnimatePresence>
            </List>
        </Container>
    </Layout>
}

export const getStaticProps = async () => {
    // Read the names of all MDX files in the projects directory
    const projectsDir = path.join(process.cwd(), 'projects');
    const mdxFiles = fs.readdirSync(projectsDir);

    const projects = mdxFiles.map(fileName => {
        // Ensure we're only processing .mdx files
        if (!fileName.endsWith('.mdx')) return null;

        // Path to the MDX file
        const filePath = path.join(projectsDir, fileName);
        // Read the file content
        const mdxSource = fs.readFileSync(filePath, 'utf8');
        // Parse the FrontMatter
        const {data} = matter(mdxSource);

        // Extract the slug from the file name
        const slug = fileName.replace(/\.mdx$/, '');

        return {slug, ...data,};
    }).filter(Boolean);

    return {props: {projects}};
};


const Container = styled(motion.div)`
    text-align: center;
    width: 80%;
    margin: 0 auto;
    flex-grow: 1;
    max-width: 1100px;

    @media (max-width: 768px) {
        width: 100%;
        flex-direction: column;
    }
`;

const List = styled(motion.div)`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2rem;
`;