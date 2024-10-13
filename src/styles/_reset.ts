import {css} from "@emotion/react";

export const GlobalStyle = css`
  * {
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif !important;
    box-sizing: border-box;
  }

  /* other styles */
  html, body, #root {
    width: 100%;
    height: 100%;
    min-width: 1440px;
    line-height: 1.3 !important;
    --main-color: #a40f16;
    --kaia-color: #3366FF;
    --side-bar-color: #363740;
    --bg-color: #F7F8FC;
    --border-color: #DFE0EB;
    
    --default-transition: all ease-in-out 0.15s
  }

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  textarea,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    line-height: 1;
  }

  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  button {
    padding: 0;
    border: none;
    background: transparent;
    outline: none;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  input, textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }

  input[type='checkbox'] {
    border: 1px solid var(--chakra-colors-gray-600) !important;
    outline: 1px solid var(--chakra-colors-gray-600) !important;
  }
  
  input:focus {
    outline: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-transition: background-color 9999s ease-out;
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: #000000 !important;
  }

  video {
    border: 0;
    outline: 0;
  }

  //.custom-tooltip{
  //  padding: 14px;
  //  border-radius: 10px;
  //  background-color: var(--chakra-colors-blackAlpha-800);
  //  color: #ffffff;
  //}

  &::-webkit-scrollbar {
    width: 8px;
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: var(--chakra-colors-blackAlpha-300);
  }

  //pagination
  
  .pagination-table{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
  }

  .pagination-nav{
    display: flex;
    justify-content: center;
  }

  .pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 7px;
    width: fit-content;
    list-style-type: unset;
    border: 2px solid var(--gray-100);
    background-color: var(--white-900);
    padding: 8px 10px;
    border-radius: 6px;
    user-select: none;
  }

  .pagination-item {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  .pagination-item:hover {
    cursor: pointer;
    background-color: var(--gray-100);
    transition: background-color 0.1s linear;
  }

  .pagination-item-active {
    color: white;
    background-color: var(--chakra-colors-facebook-400);
    pointer-events: none;
    transition: background-color 0.1s linear;
  }


`
