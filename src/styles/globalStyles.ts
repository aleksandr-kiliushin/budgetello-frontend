import { css } from "@mui/material"

import { theme } from "./theme"

export const globalStyles = css`
  html,
  body {
    height: 100%;
    margin: 0;
    font-family: "Sofia Sans", sans-serif;
    font-size: 10px;
  }

  body {
    background-color: ${theme.palette.background.default};
  }

  #root {
    height: 100%;
  }

  main {
    height: calc(100% - 60px);
    padding: 8px;
    overflow-y: scroll;
    ${theme.breakpoints.down("s")} {
      height: calc(100% - 48px);
    }
  }

  * {
    box-sizing: border-box;
    font-size: 1.6rem;
  }

  a {
    color: ${theme.palette.primary.main};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`
