import React from 'react';
import styled from 'styled-components';
import Tag from './Tag';

interface ArticleHeaderProps {
    title: string;
    tags: string[];
    date: string;
}

export default function ArticleHeader({title, tags, date}: ArticleHeaderProps) {
    return <HeaderContainer>
        <Title>{title}</Title>
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


