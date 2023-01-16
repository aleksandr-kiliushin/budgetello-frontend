import createTypography from "@mui/material/styles/createTypography"

import { breakpoints } from "./breakpoints"
import { palette } from "./palette"

export const typography = createTypography(palette, {
  allVariants: {
    color: palette.text.primary,
    fontFamily: "monospace",
    lineHeight: "1",
  },
  body1: {
    fontSize: "1.6rem",
  },
  h1: {
    fontSize: "2.7rem",
    [breakpoints.down("l")]: {
      fontSize: "2.6rem",
    },
    [breakpoints.down("m")]: {
      fontSize: "2.5rem",
    },
    [breakpoints.down("s")]: {
      fontSize: "2.4rem",
    },
  },
  h2: {
    fontSize: "2.5rem",
    [breakpoints.down("l")]: {
      fontSize: "2.4rem",
    },
    [breakpoints.down("m")]: {
      fontSize: "2.3rem",
    },
    [breakpoints.down("s")]: {
      fontSize: "2.2rem",
    },
  },
  h3: {
    fontSize: "2.3rem",
    [breakpoints.down("l")]: {
      fontSize: "2.2rem",
    },
    [breakpoints.down("m")]: {
      fontSize: "2.1rem",
    },
    [breakpoints.down("s")]: {
      fontSize: "2.0rem",
    },
  },
  h4: {
    fontSize: "2.1rem",
    [breakpoints.down("l")]: {
      fontSize: "2.0rem",
    },
    [breakpoints.down("m")]: {
      fontSize: "1.9rem",
    },
    [breakpoints.down("s")]: {
      fontSize: "1.8rem",
    },
  },
})
