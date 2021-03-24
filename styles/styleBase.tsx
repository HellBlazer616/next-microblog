import { css } from 'twin.macro';

const stylesBase = css`
  body {
    font-family: 'Inter';
    background: #ffffff;
    color: #fff;
  }

  html {
    --scrollbarBG: #6c6b6c;
    --thumbBG: #f95d9e;
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }
  body::-webkit-scrollbar {
    width: 12px;
  }
  body {
    scrollbar-color: var(--thumbBG) var(--scrollbarBG);
  }
  body::-webkit-scrollbar-track {
    background: var(--scrollbarBG);
    border-radius: 10px;
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--thumbBG);
    border-radius: 10px;
  }
  body::-webkit-scrollbar-thumb:hover {
    background: #f95d9e;
  }

  input {
    font-family: 'Inter';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  ::selection {
    color: #fff;
    background: #f95d9e;
  }
`;

export default stylesBase;
