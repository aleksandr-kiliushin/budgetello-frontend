import createTheme from "@mui/material/styles/createTheme"

import { breakpoints, mediaQuery } from "./media-queries"

export const theme = createTheme({
  breakpoints,
  components: {
    MuiButton: {
      styleOverrides: {
        sizeLarge: {
          padding: "12px 20px",
        },
      },
    },
    MuiFormControl: {
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
    },
    MuiTableCell: {
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
    },
  },
  typography: {
    allVariants: {
      fontFamily: "monospace",
      lineHeight: "1",
    },
    body1: {
      fontSize: "1.1rem",
    },
    h1: {
      fontFamily: "monospace",
      fontSize: "2.9rem",
      [mediaQuery.below.lg]: {
        fontSize: "2.8rem",
      },
      [mediaQuery.below.md]: {
        fontSize: "2.7rem",
      },
      [mediaQuery.below.sm]: {
        fontSize: "2.6rem",
      },
      [mediaQuery.below.xs]: {
        fontSize: "2.5rem",
      },
    },
    h2: {
      fontSize: "2.5rem",
      [mediaQuery.below.lg]: {
        fontSize: "2.4rem",
      },
      [mediaQuery.below.md]: {
        fontSize: "2.3rem",
      },
      [mediaQuery.below.sm]: {
        fontSize: "2.2rem",
      },
      [mediaQuery.below.xs]: {
        fontSize: "2.1rem",
      },
    },
    h3: {
      fontSize: "2.1rem",
      [mediaQuery.below.lg]: {
        fontSize: "2rem",
      },
      [mediaQuery.below.md]: {
        fontSize: "1.9rem",
      },
      [mediaQuery.below.sm]: {
        fontSize: "1.8rem",
      },
      [mediaQuery.below.xs]: {
        fontSize: "1.7rem",
      },
    },
    h4: {
      fontSize: "1.7rem",
      [mediaQuery.below.lg]: {
        fontSize: "1.6rem",
      },
      [mediaQuery.below.md]: {
        fontSize: "1.5rem",
      },
      [mediaQuery.below.sm]: {
        fontSize: "1.4rem",
      },
      [mediaQuery.below.xs]: {
        fontSize: "1.3rem",
      },
    },
  },
})
