import { Components, Theme } from "@mui/material"

export const MuiButton: NonNullable<Components<Theme>["MuiButton"]> = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      minWidth: "unset",
      width: "fit-content",
      borderRadius: 0,
      "&, &:hover": {
        boxShadow: "none",
      },
      "&.MuiButton-sizeSmall": {
        columnGap: "4px",
        height: "32px",
        padding: "0 8px",
      },
      "&.MuiButton-sizeMedium": {
        columnGap: "8px",
        height: "48px",
        padding: "0 14px",
      },
    },
    startIcon: {
      margin: 0,
    },
  },
}
