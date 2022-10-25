import { css } from "@mui/material"

import { breakpoints } from "./theme/breakpoints"

export const globalStyles = css`
  html,
  body {
    margin: 0;
  }

  main {
    height: calc(100vh - 60px);
    overflow-y: scroll;
    ${[breakpoints.down("s")]} {
      height: calc(100vh - 50px);
    }
  }

  * {
    box-sizing: border-box;
    font-family: monospace, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans,
      Droid Sans, Helvetica Neue, sans-serif;
  }
`
