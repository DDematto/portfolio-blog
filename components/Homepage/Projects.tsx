import Section from "./index";
import styled, {keyframes} from 'styled-components';
import {AiFillProject} from 'react-icons/ai';
import Link from 'next/link'
import GitHubStats from "../GithubStats";
import LeetcodeStats from "../LeetcodeStats";

export default function Projects() {
    const titles = ["03 - Projects - What I Enjoy", "03 - Projects - Always WIP"];

    return <Section defaultText="03 - Projects" titles={titles} height="50vh" id="projects">
        <Container>
            <Button href='/projects'>
                <AiFillProject/> View All Projects
            </Button>

            <TopRow>
                <GitHubStats/>
                <LeetcodeStats/>
            </TopRow>

        </Container>
    </Section>
}

const Container = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  min-height: 50vh;
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 8px #0075e0;
  }
  50% {
    box-shadow: 0 0 12px #0075e0;
  }
  100% {
    box-shadow: 0 0 8px #0075e0;
  }
`;

const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 42px;
  width: 100%;
  cursor: pointer;
  outline: none;
  border: none;
  background: linear-gradient(90deg, ${({theme}) => theme.colors.accentStart}, ${({theme}) => theme.colors.accentEnd});
  color: ${({theme}) => theme.text.primary};
  transition: all 0.5s ease;
  animation: ${pulse} 2s infinite;

  &:hover {
    background: linear-gradient(60deg, ${({theme}) => theme.colors.accentStart}, ${({theme}) => theme.colors.accentEnd});
    box-shadow: none;
    transform: scale(1.03);
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
`;

