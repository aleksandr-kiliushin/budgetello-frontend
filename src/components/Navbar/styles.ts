import { SxProps, Theme } from "@mui/material"

export const bottomNavigationSx: SxProps<Theme> = (theme) => ({
  position: "fixed",
  bottom: "0px",
  // height: "52px",
  height: "60px",
  width: "100%",
  borderTop: `1px solid ${theme.palette.primary.dark}`,
  [theme.breakpoints.down("s")]: {
    height: "48px",
  },
  "@supports (-webkit-touch-callout: none)": {
    [`@media (max-width: ${theme.breakpoints.values.s}px) and (display-mode: standalone)`]: {
      marginBottom: "20px",
    },
  },
})

// TODO: Move to theme.
export const bottomNavigationActionSx: SxProps<Theme> = ({ palette }) => ({
  "& .MuiSvgIcon-root": {
    fill: palette.primary.light,
    height: "2.5rem",
    transition: "height 0.25s, width 0.25s, fill 0.25s",
    width: "2.5rem",
  },
  "&.Mui-selected .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    height: "3.5rem",
    width: "3.5rem",
  },
  "&:hover .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    transition: "fill 0.25s",
  },
  maxWidth: "100%",
  minWidth: "40px",
  padding: "8px",
})
