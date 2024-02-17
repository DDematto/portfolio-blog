import type {AppProps} from 'next/app'
import {DefaultTheme, ThemeProvider} from 'styled-components'
import GlobalStyle from "../components/globalstyles";
import Script from 'next/script';
import Head from 'next/head';
import {Analytics} from '@vercel/analytics/react';
import {AnimatePresence} from 'framer-motion';

const theme: DefaultTheme = {
    colors: {
        background: '#111',
        primary: 'rgba(0,0,0,0.5)',
        secondary: 'white',
        accentStart: '#0050b3',
        accentEnd: '#0066cc',
    },
    text: {
        primary: 'white',
        secondary: "#40a9ff"
    }
}

export default function App({Component, pageProps, router}: AppProps) {
    return <ThemeProvider theme={theme}>
        <WebsiteInfo/>
        <AnimatePresence mode='wait' onExitComplete={() => window.scrollTo(0, 0)}>
            <Component {...pageProps} key={router.route}/>
        </AnimatePresence>
    </ThemeProvider>
}

const WebsiteInfo = () => {
    const content = "Welcome to my website! I am a software developer with a strong foundation in a variety of programming languages and frameworks. " +
        "I have experience working on projects in a variety of industries, and am always eager to learn and grow as a professional. On my website, " +
        "you can learn more about my skills and experience, view my portfolio, and get in touch with me to discuss potential opportunities. Thank you for visiting!"

    const schemaMarkup = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        "name": "Projects",
        "url": "https://www.devindematto.dev/projects"
    };

    return <>
        <Head>
            <title>Devin DeMatto | Portfolio</title>
            <meta name="description" content={content}/>
            <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
            <link rel="shortcut icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
            <script type="application/ld+json">
                {JSON.stringify(schemaMarkup)}
            </script>
        </Head>
        <Script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}`}
            async/>
        <Analytics/>
        <GlobalStyle/>
    </>
}

