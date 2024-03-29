import { Components, Theme } from "@mui/material"

import { breakpoints } from "#styles/theme/breakpoints"

export const MuiModal: NonNullable<Components<Theme>["MuiModal"]> = {
  styleOverrides: {
    root: {
      "@supports (-webkit-touch-callout: none)": {
        [`@media (max-width: ${breakpoints.values.s}px) and (display-mode: standalone)`]: {
          marginBottom: "20px",
        },
      },
    },
    backdrop: {
      "@supports (-webkit-touch-callout: none)": {
        [`@media (max-width: ${breakpoints.values.s}px) and (display-mode: standalone)`]: {
          display: "none",
        },
      },
    },
  },
}
