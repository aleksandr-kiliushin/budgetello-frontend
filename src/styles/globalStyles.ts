import { css } from "@mui/material"

import { theme } from "./theme"

export const globalStyles = css`
  html,
  body {
    margin: 0;
    background-color: ${theme.palette.background.default};
  }

  main {
    height: calc(100vh - 60px);
    overflow-y: scroll;
    ${theme.breakpoints.down("s")} {
      height: calc(100vh - 50px);
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
