import { Components, Theme } from "@mui/material"

export const MuiButtonBase: NonNullable<Components<Theme>["MuiButtonBase"]> = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      "&.MuiButton-sizeSmall": {
        height: "32px",
      },
      "&.MuiButton-sizeMedium": {
        height: "48px",
      },
    },
  },
}
