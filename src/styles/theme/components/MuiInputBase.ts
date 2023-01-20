import { Components, Theme } from "@mui/material"

export const MuiInputBase: NonNullable<Components<Theme>["MuiInputBase"]> = {
  styleOverrides: {
    root: {
      "& svg.MuiSelect-icon": {
        top: "10px",
      },
    },
    sizeSmall: {
      "& svg.MuiSelect-icon": {
        top: "4px",
      },
    },
  },
}
