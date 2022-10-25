// import { ThemeProvider as StorybookThemeProvider } from "@storybook/theming"
import { Global } from "@emotion/react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import React from "react"

import { globalStyles } from "../src/styles/globalStyles"
import { theme } from "../src/styles/theme"

export const decorators = [
  (Story) => (
    // <StorybookThemeProvider theme={theme}>
    <MuiThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <Story />
    </MuiThemeProvider>
    // </StorybookThemeProvider>
  ),
]
