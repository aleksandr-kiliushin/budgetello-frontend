import { Components, Theme } from "@mui/material"

export const MuiIconButton: NonNullable<Components<Theme>["MuiIconButton"]> = {
  styleOverrides: {
    root: {
      "&.MuiIconButton-sizeSmall": {
        height: "32px",
      },
      "&.MuiIconButton-sizeMedium": {
        height: "48px",
      },
    },
  },
}
