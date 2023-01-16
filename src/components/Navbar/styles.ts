import { SxProps, Theme } from "@mui/material"

export const bottomNavigationSx: SxProps<Theme> = (theme) => ({
  position: "fixed",
  bottom: "0px",
  height: "60px",
  width: "100%",
  borderTop: `1px solid ${theme.palette.primary.light}`,
  boxShadow: `0px 20px 20px 8px ${theme.palette.text.primary}`,
  [theme.breakpoints.down("s")]: {
    height: "48px",
  },
})

// TODO: Move to theme.
export const bottomNavigationActionSx: SxProps<Theme> = ({ palette }) => ({
  "& .MuiSvgIcon-root": {
    fill: palette.primary.light,
    height: "2.5rem",
    transition: "height 0.2s linear, width 0.2s linear, fill 0.2s linear",
    width: "2.5rem",
  },
  "&.Mui-selected .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    height: "3.5rem",
    width: "3.5rem",
  },
  "&:hover .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    transition: "fill 0.2s linear",
  },
  maxWidth: "100%",
  minWidth: "40px",
  padding: "8px",
})
