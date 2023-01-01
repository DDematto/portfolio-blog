import {motion, useScroll} from "framer-motion";
import {useEffect, useState} from "react";
import styled from "styled-components";
import NavLink from "./NavLink";
import Image from 'next/image'
import logoPic from "../../public/images/logo.png";

export default function Navigation() {
    const {scrollY} = useScroll();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => {
            if (latest < 10) return setHidden(false);
            setHidden(latest > scrollY.getPrevious());
        })
    }, [])

    const variants = {
        hidden: {opacity: 0, y: -50, transition: {duration: 0.1}},
        visible: {opacity: 1, y: 0, transition: {duration: 0.1}}
    }

    return <Nav variants={variants} animate={hidden ? "hidden" : "visible"}>
        <StyledLogo src={logoPic} width={96} height={96} alt="Picture of Logo"/>
        <Wrapper>
            <NavLink href="/#about" title="01 - About"/>
            <NavLink href="/#skills" title="02 - Skills"/>
            <NavLink href="/#education" title="03 - Education"/>
            <NavLink href="/#contact" title="04 - Contact"/>
        </Wrapper>
        <NavLink href="/projects" title="Projects"/>
    </Nav>
}

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 80px;
  background-color: ${({theme}) => theme.colors.background};
  border-bottom: 1px solid ${({theme}) => theme.colors.secondary};
  padding: 0 2rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
  z-index: 1000;
`

const StyledLogo = styled(Image)`
  width: 50px;
  height: 50px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
`
