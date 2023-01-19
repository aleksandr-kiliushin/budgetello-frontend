import { Components, Theme } from "@mui/material"

export const MuiTableContainer: NonNullable<Components<Theme>["MuiTableContainer"]> = {
  styleOverrides: {
    root: {
      overflowX: "visible",
    },
  },
}
