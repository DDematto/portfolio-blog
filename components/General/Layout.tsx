import {motion} from "framer-motion";
import {Fira_Code} from "next/font/google"
import styled from 'styled-components'
import React from "react";
import Footer from "./Footer";

// Text
const roboto = Fira_Code({subsets: ['latin'], weight: "400", style: 'normal'})

// Animation Timings
export const startDuration = 1 // Max duration for animating in
export const exitDuration = 1; // Duration for animating out

export const inViewForAnimate = 0.60; // Percentage of Component must be in view before animation starts

// Shared Layout
export default function Layout({children, style}: { children: any, style?: any }) {
    return <>
        <LayoutContainer style={style} className={roboto.className} initial={{opacity: 0}}
                         animate={{opacity: 1, transition: {duration: startDuration}}}
                         exit={{opacity: 0, transition: {duration: exitDuration}}}>
            {children}
        </LayoutContainer>
        <Footer/>
    </>

}

const LayoutContainer = styled(motion.div)`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    margin: auto;
    flex-grow: 1;
    max-width: 1400px;
`
