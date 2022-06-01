import { css } from "styled-components";
import "assets/fonts/fonts.css";
import media from "./media";
import theme from "assets/css/theme";

export default css`
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
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }

  html,
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    background-color: ${theme.$grayWhiteColor};
    min-height: 100vh;
  }

  .uppercase {
    text-transform: uppercase;
  }

  a {
    color: inherit;
    text-decoration: underline;
  }

  * {
    box-sizing: border-box;
  }

  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
    margin: 0 auto;
    position: relative;

    & > div {
      background-color: #f1f5f7;
      min-height: 100vh;
    }
  }

  input {
    border: none;
    box-shadow: none;
    outline: none;
  }

  html {
    -webkit-text-size-adjust: none;
  }

  .hidden-mobile {
    @media (max-width: ${media.desktop}) {
      display: none;
    }

    &-landscape {
      @media (max-width: ${media.desktop}) and (orientation: landscape) {
        display: none;
      }
    }

    &-portrait {
      @media (max-width: ${media.desktop}) and (orientation: portrait) {
        display: none;
      }
    }
  }

  .hidden-desktop {
    @media (min-width: ${media.desktopMin}) {
      display: none;
    }
  }

  .container {
    @media (min-width: ${media.largeDesktop}) {
      max-width: 1600px;
    }
  }
  html,
  body {
    scroll-behavior: smooth;
  }
`;
