import { Theme } from "@mui/material/styles"
import { Components } from "@mui/material/styles/components"

export const MuiOutlinedInput: NonNullable<Components<Theme>["MuiOutlinedInput"]> = {
  styleOverrides: {
    input: {
      padding: "0 14px",
      // borderRadius: "0",
      // fontSize: "16px",
      // fontWeight: "600",
      height: "22px",
      "& ~ fieldset": {
        height: "43px",
        transform: "translateY(1px)",
      },
      // '&:not(.Mui-disabled):not(:disabled):not([aria-invalid="true"]):hover ~ fieldset': {
      //   boxShadow: "4px 4px 10px rgba(158, 223, 255, 0.2)",
      // },
      // '&.Mui-disabled:not(:disabled):not([aria-invalid="true"]):hover ~ fieldset': {
      //   boxShadow: `0px 0px 4px 1px ${palette.error.light}`,
      // },
      // "&::-webkit-outer-spin-button, &::-webkit-inner-spin-button": {
      //   WebkitAppearance: "none",
      //   margin: "0",
      // },
      // "&[type=number]": {
      //   MozAppearance: "textfield",
      // },
    },
    root: {
      height: "40px",
      borderRadius: "0px",
    },
  },
  // variants: [
  //   {
  //     props: { color: "primary" },
  //     style: {
  //       backgroundColor: "white",
  //       "&:hover > input:not(:disabled) ~ fieldset": {
  //         borderColor: palette.primary.light,
  //       },
  //       "&.Mui-error > input ~ fieldset": {
  //         borderColor: "#d32f2f !important",
  //       },
  //       input: {
  //         color: palette.primary.main,
  //         "& ~ fieldset": {
  //           borderColor: palette.primary.light,
  //         },
  //         "&:not(:disabled):not(.Mui-disabled):hover ~ fieldset": {
  //           borderColor: palette.primary.light,
  //         },
  //         "&::placeholder": {
  //           color: palette.primary.light,
  //         },
  //       },
  //     },
  //   },
  //   {
  //     props: { color: "secondary" },
  //     style: {
  //       backgroundColor: palette.secondary.light,
  //       "&:hover > input:not(:disabled) ~ fieldset": {
  //         borderColor: "#d8d8d8",
  //       },
  //       "&.Mui-error > input ~ fieldset": {
  //         borderColor: "#000000",
  //       },
  //       "&.Mui-focused:not(:disabled):not(.Mui-disabled) > input ~ fieldset": {
  //         borderColor: "#d8d8d8",
  //       },
  //       input: {
  //         color: palette.secondary.main,
  //         "& ~ fieldset": {
  //           borderColor: "#eaeaea",
  //         },
  //         "&:not(:disabled):not(.Mui-disabled):hover ~ fieldset": {
  //           borderColor: "#eaeaea",
  //         },
  //         "&::placeholder": {
  //           color: "#788185",
  //         },
  //       },
  //     },
  //   },
  // ],
}
