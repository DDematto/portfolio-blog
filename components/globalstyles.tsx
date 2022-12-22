import {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, body {
    padding: 0;
    margin: 0;
    background-color: #111;
    color: white;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
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
`

export default GlobalStyle