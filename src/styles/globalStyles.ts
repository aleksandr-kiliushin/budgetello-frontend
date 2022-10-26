import { css } from "@mui/material"

import { theme } from "./theme"

export const globalStyles = css`
  html,
  body {
    height: 100%;
    margin: 0;
  }

  body {
    background-color: ${theme.palette.background.default};
  }

  #root {
    height: 100%;
  }

  main {
    height: calc(100% - 60px);
    overflow-y: scroll;
    ${theme.breakpoints.down("s")} {
      height: calc(100% - 48px);
    }
  }

  * {
    box-sizing: border-box;
    font-family: monospace;
  }

  a {
    color: ${theme.palette.text.primary};
  }
`
