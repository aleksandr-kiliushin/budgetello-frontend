import { Components, Theme } from "@mui/material"

export const MuiButton: NonNullable<Components<Theme>["MuiButton"]> = {
  defaultProps: {
    disableRipple: true,
  },
  styleOverrides: {
    root: {
      width: "fit-content",
      minWidth: "unset",
      borderRadius: 0,
      fontSize: "1.6rem",
      whiteSpace: "nowrap",
      "&, &:hover": {
        boxShadow: "none",
      },
      "&.MuiButton-sizeSmall": {
        columnGap: "4px",
        height: "28px",
        padding: "0 4px",
      },
      "&.MuiButton-sizeMedium": {
        columnGap: "8px",
        height: "38px",
        padding: "0 8px",
      },
    },
    startIcon: {
      margin: 0,
    },
  },
}
