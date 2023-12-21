import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {serialize} from 'next-mdx-remote/serialize';
import {MDXRemote} from 'next-mdx-remote';
import styled from 'styled-components'
import Navigation from "../../components/Project/Navigation";
import Head from "next/head";
import ArticleHeader from "../../components/Project/ArticleHeader";
import Image from 'next/image';

const components = {Image};

export default function ProjectPage({source, frontMatter, images, headerImage}: any) {
    const titleString = `Project ${frontMatter.title ? `| ${frontMatter.title}` : ''}`;

    return <Container>
        <Head>
            <title>{titleString}</title>
        </Head>

        <Navigation href='/projects' name='Projects'/>

        {headerImage && <StyledImage
            src={headerImage}
            alt={frontMatter.title}
        />}

        <ArticleHeader title={frontMatter.title} tags={frontMatter.tags} date={frontMatter.date}/>

        <MDXRemote {...source} components={components}/>
    </Container>
}

const Container = styled.div`
    text-align: center;
    width: 100%;
    max-width: 95%;
    margin: 0 auto;
    flex-grow: 1;
`;

const StyledImage = styled(Image)`
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%; // Image will take the full width of its container
    height: auto; // Height will scale automatically
    max-height: 300px; // Limit the maximum height
    object-fit: cover; // Ensures the image covers the area
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
    const imageDirectory = path.join(process.cwd(), 'public', 'images', 'projects', params.slug);
    let imageFiles: string[] = [];
    try {
        imageFiles = fs.readdirSync(imageDirectory);
    } catch (error) {
        console.error("Error reading image directory:", error);
    }

    const images = imageFiles.map(file => `/images/projects/${params.slug}/${file}`);

    // Look for a file named 'header' (or similar) and set headerImage accordingly
    let headerImage = "";
    const headerFileName = imageFiles.find(file => file.startsWith('header'));
    if (headerFileName) {
        headerImage = `/images/projects/${params.slug}/${headerFileName}`;
    }

    return {
        props: {
            source: mdxRemoteSource,
            frontMatter: data,
            images,
            headerImage
        },
    };
}


