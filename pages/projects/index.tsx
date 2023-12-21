import Fuse from 'fuse.js';
import React, {useState, useMemo} from 'react';
import Head from "next/head";
import styled from 'styled-components';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import SearchFilter from '../../components/Project/SearchFilter'
import ProjectCard, {IProject} from '../../components/Project/ProjectCard'
import Navigation from "../../components/Project/Navigation";
import GitHubStats from "../../components/GithubStats";
import LeetcodeStats from "../../components/LeetcodeStats";

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

    return <Container>
        <Head>
            <title>Devin DeMatto | Projects</title>
        </Head>

        <TopRow>
            <GitHubStats/>
            <LeetcodeStats/>
        </TopRow>

        <Navigation href='/' name='Homepage'/>

        <SearchFilter filters={filters} setFilters={setFilters} setSearch={setSearch}/>

        <List>
            {filteredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project}/>
            ))}
        </List>
    </Container>
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


const Container = styled.div`
    text-align: center;
    width: 100%;
    margin: 0 auto;
    flex-grow: 1;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    gap: 1.5rem;
    margin-bottom: 1rem;
`;

const TopRow = styled.div`
    display: flex;
    justify-content: space-between;
    flex: 1;
`;