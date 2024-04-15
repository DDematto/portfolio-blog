import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';
import styled from 'styled-components'
import Navigation from "../../components/Projects/Navigation";
import Head from "next/head";
import {motion} from 'framer-motion'

// Projects Components
import ProjectHeader from "../../components/Projects/Project/ProjectHeader";
import BlogImage from "../../components/Projects/Project/ProjectImage";
import ProjectCarousel from "../../components/Projects/Project/ProjectCarousel";
import Section from "../../components/Projects/Project/Section";
import LegendNavbar from "../../components/Projects/LegendNavbar";
import Layout, {exitDuration, startDuration} from "../../components/General/Layout";
import YouTubeEmbed from "../../components/Projects/Project/YoutubeEmbed";

const components = {BlogImage, ProjectCarousel, Section, YouTubeEmbed};

export default function ProjectPage({source, frontMatter, headerImage}: any) {
    const titleString = `Project ${frontMatter.title ? `| ${frontMatter.title}` : ''}`;

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
            }
        }
    };

    return <Layout>
        <Head>
            <title>{titleString}</title>
        </Head>

        <Navigation href='/projects' name='Projects'/>

        <Container variants={containerVariants} initial="hidden" animate="visible" exit="exit">
            <LegendNavbar sections={frontMatter.sections}/>

            {headerImage && <BlogImage src={headerImage} alt={frontMatter.title}/>}

            <ProjectHeader title={frontMatter.title} tags={frontMatter.tags} date={frontMatter.date}
                           github={frontMatter.github}/>

            <MDXRemote {...source} components={components}/>
        </Container>
    </Layout>
}

const Container = styled(motion.div)`
    background-color: #1a1a1a;
    text-align: left;
    width: 100%;
    max-width: 1366px;
    margin-bottom: 40px;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    flex: 1;


    @media (max-width: 768px) {
        width: 80%;
    }
`;

export async function getStaticPaths() {
    const projectsDir = path.join(process.cwd(), 'projects');
    const mdxFiles = fs.readdirSync(projectsDir);

    const paths = mdxFiles.map(file => {
        const slug = file.replace(/\.mdx$/, '');
        return {params: {slug}};
    });

    return {paths, fallback: false};
}

export async function getStaticProps({params}: any) {
    const mdxFilePath = path.join(process.cwd(), 'projects', `${params.slug}.mdx`);
    const mdxSource = fs.readFileSync(mdxFilePath, 'utf8');
    const {data, content} = matter(mdxSource);
    const mdxRemoteSource = await serialize(content);

    // Images are now assumed to be in a folder following the pattern 'public/images/projects/slug'
    const imageDirectory = path.join(process.cwd(), 'public', 'projects', params.slug);
    let imageFiles: string[] = [];
    try {
        imageFiles = fs.readdirSync(imageDirectory);
    } catch (error) {
        console.error("Error reading image directory:", error);
    }

    const headerImageFile = imageFiles.find(file => file.startsWith('header'));
    const headerImage = headerImageFile ? `/projects/${params.slug}/${headerImageFile}` : '';

    return {
        props: {
            source: mdxRemoteSource,
            frontMatter: data,
            headerImage,
        },
    };
}
