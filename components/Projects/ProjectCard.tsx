import styled from 'styled-components'
import Tag from "./Tag"
import Link from 'next/link';

export interface IProject {
    title: string,
    tags: string[],
    description: string,
    slug: string
}

export default function ProjectCard(props: { project: IProject }) {
    const {title, tags, description, slug} = props.project;
    const projectSlug = slug.replace(/\s+/g, '_');
    const truncatedDescription = truncateDescription(description, 30);

    return <ProjectContainer href={`/projects/${projectSlug}`}>
        <Title>{title}</Title>
        <TagsContainer>
            {tags.map(tag => <Tag key={tag} name={tag}/>)}
        </TagsContainer>
        {description &&
            <>
                <Separator/>
                <Description>{truncatedDescription}</Description>
            </>
        }
    </ProjectContainer>
}

function truncateDescription(description = '', limit: number) {
    const words = description.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...';
    }
    return description;
}

const ProjectContainer = styled(Link)`
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.text.primary};
    padding: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: 2px solid white;
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    margin: 0 auto;
    width: 100%;

    &:hover {
        transform: scale(1.001);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const Title = styled.h2`
  text-align: left;
  color: ${({theme}) => theme.text.primary};
  font-size: 1.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0.5rem 0;
  gap: 0.5rem;
`;

const Separator = styled.hr`
  border: 0;
  height: 1px;
  background: ${({theme}) => theme.colors.secondary};
  margin: 0.5rem 0;
`;

const Description = styled.p`
  color: ${({theme}) => theme.text.primary};
  text-align: left;
`;