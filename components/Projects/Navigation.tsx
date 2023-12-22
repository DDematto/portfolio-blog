import Link from 'next/link';
import styled from 'styled-components'

export default function Navigation(props: { href: string, name: string }) {
    const {href, name} = props;

    return <ProjectNavigation>
        <Link href={href} passHref>
            <Back>{name}</Back>
        </Link>
    </ProjectNavigation>
}


const ProjectNavigation = styled.nav`
  width: 100%;
  padding: 1rem 2rem;
  background-color: ${({theme}) => theme.colors.background};
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 1rem;
`;

const Back = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  cursor: pointer;

  &::before {
    content: "<--";
    display: inline-block;
    margin-right: 8px;
  }
`;
