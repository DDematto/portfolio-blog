import styled from "styled-components";
import NavLink from "./NavLink";

export default function Navigation() {
    return <Container>
        <NavLink href="/" title="Home"/>
        <NavLink href="/projects" title="Projects"/>
        <NavLink href="/blog" title="Blog"/>
    </Container>
}

const Container = styled.nav`
  position: sticky;
  width: 70%;
  height: 4rem;
  margin: 1rem auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  background-color: ${({theme}) => theme.colors.background};
`