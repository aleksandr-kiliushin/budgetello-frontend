import { Components, Theme } from "@mui/material"

export const MuiTableCell: NonNullable<Components<Theme>["MuiTableCell"]> = {
  styleOverrides: {
    head: {
      fontWeight: "bold",
    },
    sizeMedium: {
      height: "40px",
      padding: "4px",
      fontSize: "1.4rem",
    },
  },
}
