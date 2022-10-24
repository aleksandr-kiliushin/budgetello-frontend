import { Components, Theme } from "@mui/material"

export const MuiTableCell: NonNullable<Components<Theme>["MuiTableCell"]> = {
  styleOverrides: {
    head: {
      fontWeight: "bold",
    },
    root: {
      "&:not(:first-of-type)": {
        paddingLeft: "4px",
      },
      "&:not(:last-of-type)": {
        paddingRight: "4px",
      },
    },
  },
}
