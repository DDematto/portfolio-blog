import Link from 'next/link'
import styled from 'styled-components'

interface IStyledLink {
    title: string;
    className?: string;
    href: string;
}

export default function NavLink(props: IStyledLink) {
    const {title, href} = props;

    // @ts-ignore
    return <Style scroll={true} href={href}>
        {title}
    </Style>
}

const Style = styled(Link)`
  color: ${({theme}) => theme.text.highlight};
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  font-style: italic;


  &:hover {
    color: ${({theme}) => theme.text.secondary};;
  }

  &:focus {
    color: ${({theme}) => theme.text.secondary};;
    outline: none;
    border: 0;
  }
`