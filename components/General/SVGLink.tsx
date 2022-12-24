import {motion} from "framer-motion"
import styled from 'styled-components'

export default function SVGLink({href, children}: { href: string, children: any }) {
    return (
        <Container
            whileHover={{scale: 1.2}}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children}
        </Container>
    );
};

const Container = styled(motion.a)`
  fill: #fff;

  & > svg {
    width: 100%;
    height: 100%;
  }
`