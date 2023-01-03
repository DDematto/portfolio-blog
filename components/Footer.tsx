import styled from "styled-components";
import GitHub from "./Icons/Github";
import Twitter from "./Icons/Twitter";
import LinkedIn from "./Icons/LinkedIn";
import CopyText, {CopyTextStyle} from "./CopyText";
import {AiFillHeart} from "react-icons/ai";

export default function Footer() {
    return <Container>
        <span><p>Made With Love</p> <AiFillHeart/></span>

        <ProfileLinks>
            <a target="new" href="https://github.com/DDematto"><GitHub size={48}/></a>
            <a target="new" href="https://twitter.com/DevinDematto"><Twitter size={48}/></a>
            <a target="new" href="https://www.linkedin.com/in/devin-dematto-60a48718b/"><LinkedIn size={48}/></a>
        </ProfileLinks>
        <Info>
            <h4>Contact</h4>
            <CopyText text="devindematto@gmail.com"/>
        </Info>
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

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    svg {
      color: red;
      height: 1.5rem;
      width: 1.5rem;
    }
  }

  @media (max-width: 660px) {
    span {
      display: none;
    }
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

const Info = styled.div`
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

