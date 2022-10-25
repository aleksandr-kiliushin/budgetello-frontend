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
        height: "28px",
        padding: "0 5px",
      },
      "&.MuiButton-sizeMedium": {
        columnGap: "8px",
        height: "38px",
        padding: "0 10px",
      },
    },
    startIcon: {
      margin: 0,
    },
  },
}
