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
    return <Style href={href} passHref>
        {title}
    </Style>
}

const Style = styled(Link)`
  color: #0075e0;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #40a9ff;
  }

  &:focus {
    color: #40a9ff;
    outline: none;
    border: 0;
  }
`