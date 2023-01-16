import { css } from "@mui/material"

import SofiaSansFont from "./fonts/SofiaSans.ttf"
import { theme } from "./theme"

export const globalStyles = css`
  html,
  body {
    height: 100%;
    margin: 0;
    font-family: SofiaSans, Arial;
    font-size: 10px;
    @font-face {
      font-family: "SofiaSans";
      src: local("SofiaSans"), url(${SofiaSansFont}) format("woff2-variations");
    }
  }

  body {
    background-color: ${theme.palette.background.default};
  }

  #root {
    height: 100%;
  }

  main {
    height: calc(100% - 60px);
    padding: 12px;
    overflow-y: scroll;
    ${theme.breakpoints.down("s")} {
      height: calc(100% - 48px);
    }
  }

  * {
    box-sizing: border-box;
  }

  a {
    font-size: 1.6rem;
  }
`
