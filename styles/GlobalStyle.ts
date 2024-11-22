import { createGlobalStyle } from 'styled-components';
import { media } from './media.styles';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue-100: #3692ff;
    --blue-200: #1967d6;
    --blue-300: #1251aa;

    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;

    --red: #f74747;
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
  input,
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
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }

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

  html {
    font-size: 10px;
  }

  body {
    line-height: 1;
  }
  body > * {
    color: var(--gray-700);
  }
  ol,
  ul, li {
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
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  button {
    border: none;
    background-color: transparent;
    padding: 0;
  }
  a {
    display: inline-block;
    text-decoration: none;
    color: var(--gray-800);
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }

    
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body > *,
  textarea {
    font-family: 'Pretendard', sans-serif;
  }

  h1, h2, h3, h4, h5, p{
    color: var(--gray-800);
  }

/* 태블릿 */
${media.ta`
  html {
    font-size: 1.3021vw;
  }
`}


/* 모바일 */
${media.mo`
  html {
    font-size: 2.66667vw;
  }
`}
`;

export default GlobalStyle;
