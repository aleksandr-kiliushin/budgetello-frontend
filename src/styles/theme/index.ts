import { createTheme } from "@mui/material"

import { breakpoints } from "./breakpoints"
import { components } from "./components"
import { typography } from "./typography"

export const theme = createTheme({
  breakpoints,
  components,
  typography,
})
