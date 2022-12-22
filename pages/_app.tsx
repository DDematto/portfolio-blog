import {AnimatePresence} from 'framer-motion';
import type {AppProps} from 'next/app'
import styled, {ThemeProvider, DefaultTheme} from 'styled-components'
import GlobalStyle from "../components/globalstyles";
import Navigation from "../components/Navigation";

const theme: DefaultTheme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
}

export default function App({Component, pageProps}: AppProps) {
    return <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <AnimatePresence>
            <Layout>
                <Navigation/>
                <Component {...pageProps} />
            </Layout>
        </AnimatePresence>
    </ThemeProvider>
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`