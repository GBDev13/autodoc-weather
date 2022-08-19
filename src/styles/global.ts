import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    font-family: 'Quicksand', sans-serif;
  }

  body {
    color: #fff;
    background: #212121
  }
  
  button {
    cursor: pointer;
  }
`
