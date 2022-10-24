import { Components, Theme } from "@mui/material"

export const MuiFormControl: NonNullable<Components<Theme>["MuiFormControl"]> = {
  styleOverrides: {
    root: {
      ".MuiInputBase-input": {
        padding: "8px 12px",
      },
      ".MuiInputLabel-root:not(.Mui-focused):not(.MuiFormLabel-filled)": {
        top: "-8px",
      },
    },
  },
}
