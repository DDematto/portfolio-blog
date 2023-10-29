import styled from "styled-components";
import GitHub from "./Icons/Github";
import X from "./Icons/X";
import LinkedIn from "./Icons/LinkedIn";
import CopyText from "./CopyText";
import {AiFillHeart} from "react-icons/ai";
import Link from "next/link";

export default function Footer() {
    return <Container>
        <VerticalContainer>
            <IconTextContainer>
                Made With Love
                <AiFillHeart/>
            </IconTextContainer>
            <ResumeButton href={'/resume.pdf'}>Resume</ResumeButton>
        </VerticalContainer>

        <ProfileLinks>
            <a target="new" href="https://github.com/DDematto"><GitHub size={48}/></a>
            <a target="new" href="https://twitter.com/DevinDematto"><X size={48}/></a>
            <a target="new" href="https://www.linkedin.com/in/devin-dematto-60a48718b/"><LinkedIn size={48}/></a>
        </ProfileLinks>

        <VerticalContainer>
            <h4>Contact</h4>
            <CopyText text="devindematto@gmail.com"/>
        </VerticalContainer>
    </Container>
}

const Container = styled.div`
  width: 100%;
  height: 5rem;
  padding: 1rem;

  display: flex;
  justify-content: space-between;

  font-size: 0.9rem;
  background: ${({theme}) => theme.colors.primary};
  border-top: 1px solid ${({theme}) => theme.colors.secondary};
`

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 0.5rem;

  @media (max-width: 660px) {
    display: none;
  }
`

const ResumeButton = styled(Link)`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  font-style: italic;
  color: ${({theme}) => theme.text.secondary};

  &:hover {
    color: ${({theme}) => theme.text.highlight};
  }
`

const IconTextContainer = styled.h4`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  height: 0.8rem;

  svg {
    color: red;
    height: 1rem;
    width: 1rem;
  }
`

const ProfileLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1rem;
  margin: 0 auto;
`



