import { Components, Theme } from "@mui/material"

export const MuiButton: NonNullable<Components<Theme>["MuiButton"]> = {
  styleOverrides: {
    sizeLarge: {
      padding: "12px 20px",
    },
  },
}
