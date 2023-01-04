import type {AppProps} from 'next/app'
import styled, {DefaultTheme, ThemeProvider} from 'styled-components'
import GlobalStyle from "../components/globalstyles";
import {Fira_Code} from '@next/font/google'
import Script from 'next/script';
import Head from 'next/head';
import {Analytics} from '@vercel/analytics/react';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import Transition, {FirstTransition, Type} from "../components/Transition";

const theme: DefaultTheme = {
    colors: {
        background: '#111',
        primary: 'rgba(0,0,0,0.5)',
        secondary: 'white',
    },
    text: {
        primary: 'white',
        highlight: "#0075e0",
        secondary: "#40a9ff"
    }
}

const roboto = Fira_Code({subsets: ['latin']})

const content = "Welcome to my website! I am a software developer with a strong foundation in a variety of programming languages and frameworks. " +
    "I have experience working on projects in a variety of industries, and am always eager to learn and grow as a professional. On my website, " +
    "you can learn more about my skills and experience, view my portfolio, and get in touch with me to discuss potential opportunities. Thank you for visiting!"


export default function App({Component, pageProps}: AppProps) {
    const [transition, setTransition] = useState(FirstTransition);

    const pageVariant = {
        initial: {opacity: 0, transition: {duration: 1, delay: 1}},
        animate: {opacity: 1, transition: {duration: 1, delay: 1}},
        exit: {opacity: 0, transition: {duration: 1, delay: 1}}
    }

    return <ThemeProvider theme={theme}>
        <WebsiteInfo/>

        <Transition transition={transition} setTransition={setTransition}/>

        <AnimatePresence mode='wait'>
            {transition.type == Type.None &&
                <Container className={roboto.className} initial="initial" animate="animate" exit="exit"
                           variants={pageVariant}>
                    <Navigation/>
                    <Component {...pageProps} />
                    <Footer/>
                </Container>
            }
        </AnimatePresence>


    </ThemeProvider>
}

const WebsiteInfo = () => {
    return <>
        <Head>
            <title>Devin DeMatto | Portfolio</title>
            <meta name="description" content={content}/>
            <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
            <link rel="shortcut icon" href="/images/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
        </Head>
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}`}
            async/>
        <Analytics/>
        <GlobalStyle/>
    </>
}

const Container = styled(motion.div)`
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
`