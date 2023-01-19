import { Components, Theme } from "@mui/material"

import { palette } from "#styles/theme/palette"

export const MuiTableHead: NonNullable<Components<Theme>["MuiTableHead"]> = {
  styleOverrides: {
    root: {
      zIndex: 1,
      position: "sticky",
      top: "-8px",
      backgroundColor: palette.background.default,
      boxShadow: `0 0.5px ${palette.text.primary}`, // For Chromium.
      "& th": {
        boxShadow: `0 0.5px ${palette.text.primary}`, // For Safari.
      },
    },
  },
}
