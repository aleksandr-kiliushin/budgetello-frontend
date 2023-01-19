import { Components, Theme } from "@mui/material"

import { palette } from "#styles/theme/palette"

export const MuiTableHead: NonNullable<Components<Theme>["MuiTableHead"]> = {
  styleOverrides: {
    root: {
      zIndex: 1,
      position: "sticky",
      top: "-8px",
      backgroundColor: palette.background.default,
      boxShadow: `0px 16px 20px -19px ${palette.text.primary}`,
      WebkitBoxShadow: `0px 16px 20px -19px ${palette.text.primary}`,
    },
  },
}
