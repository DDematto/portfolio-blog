import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle<{ theme: any }>`
  html, body {
    padding: 0;
    margin: 0;

    // @ts-ignore
    background-color: ${({theme}) => theme.colors.background};
    color: ${({theme}) => theme.text.primary};

    --scrollbarBG: ${({theme}) => theme.colors.background};
    --thumbBG: #90A4AE;
    scrollbar-width: thin;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }

  body::-webkit-scrollbar {
    width: 11px;
  }

  body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 6px;
    border: 3px solid var(--scrollbarBG);
  }


  // Removes ReCAPTCHA badge
  .grecaptcha-badge {
    visibility: hidden;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    user-select: none;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  h2 {
    font-size: 1.25rem;
    font-weight: 500;
  }

  p {
    font-size: 1rem;
    font-weight: lighter;
    line-height: 2;
    letter-spacing: .05rem;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }


  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
`


export default GlobalStyle