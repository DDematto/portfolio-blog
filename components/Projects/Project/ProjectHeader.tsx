import React from 'react';
import styled from 'styled-components';
import Tag from "../Tag";
import GitHub from "../../General/Icons/Github";

interface ArticleHeaderProps {
    title: string;
    tags: string[];
    date: string;
    github: string;
}

export default function ProjectHeader({title, tags, date, github}: ArticleHeaderProps) {
    return <HeaderContainer>
        <Title>{title}</Title>
        {github && <Link target="new" href={github}>GitHub</Link>}
        <AuthorDate>
            <span>Devin DeMatto</span>
            <span>·</span>
            <span>{date}</span>
        </AuthorDate>
        <div>
            {tags.map(tag => <Tag key={tag} name={tag}/>)}
        </div>
    </HeaderContainer>
}

const HeaderContainer = styled.div`
    display: grid;
    gap: 0.25rem;
    text-align: left;
    margin-bottom: 1.5rem;
    margin-top: 0.5rem;
`;

const Title = styled.h1`
    font-size: 2.25rem;
    font-weight: 800;
    margin: 0;
    padding: 0;
`;

const AuthorDate = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const Link = styled.a`
    color: ${({theme}) => theme.text.secondary};
`;