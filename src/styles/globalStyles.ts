import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset};

  html,
  body,
  #root {
    font-family: Roboto, Sans-Serif;
    background: rgba(24, 63, 104, 1);
    font-size: 16px;
  }

  * {
    box-sizing: border-box;
  }

  a, a:visited {
    color: currentColor;
  }
  
`;
