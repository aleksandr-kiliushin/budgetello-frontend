import { Theme } from "@mui/material/styles"
import { Components } from "@mui/material/styles/components"

import { palette } from "../palette"

export const MuiOutlinedInput: NonNullable<Components<Theme>["MuiOutlinedInput"]> = {
  styleOverrides: {
    input: {
      // A hack to set backgound-color when selected a suggested autofill value.
      "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active": {
        boxShadow: `0 0 0 30px ${palette.background.default} inset !important`,
        WebkitBoxShadow: `0 0 0 30px ${palette.background.default} inset !important`,
        WebkitTextFillColor: `${palette.text.primary} !important`,
      },
      "&:disabled:-webkit-autofill, &:disabled:-webkit-autofill:hover, &:disabled:-webkit-autofill:focus, &:disabled:-webkit-autofill:active":
        {
          boxShadow: `0 0 0 30px ${palette.background.default} inset !important`,
          WebkitBoxShadow: `0 0 0 30px ${palette.background.default} inset !important`,
          WebkitTextFillColor: `${palette.text.primary} !important`,
        },
    },
    root: {
      height: "40px",
      borderRadius: "0px",
    },
    sizeSmall: {
      height: "28px",
    },
  },
}
