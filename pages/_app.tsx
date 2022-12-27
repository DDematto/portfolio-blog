import {AnimatePresence} from 'framer-motion';
import type {AppProps} from 'next/app'
import styled, {ThemeProvider, DefaultTheme} from 'styled-components'
import GlobalStyle from "../components/globalstyles";
import Navigation from "../components/Navigation";
import {Fira_Code} from '@next/font/google'

const theme: DefaultTheme = {
    colors: {
        primary: '#111',
        secondary: '#0070f3',
    },
}


const roboto = Fira_Code({subsets: ['latin']})

export default function App({Component, pageProps}: AppProps) {
    return <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <AnimatePresence>
            <Layout className={roboto.className}>
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