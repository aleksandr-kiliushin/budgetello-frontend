import { Global } from "@emotion/react"
import { ThemeProvider } from "@mui/material/styles"
import React from "react"

import { globalStyles } from "../src/styles/globalStyles"
import { theme } from "../src/styles/theme"

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Story />
    </ThemeProvider>
  ),
]
