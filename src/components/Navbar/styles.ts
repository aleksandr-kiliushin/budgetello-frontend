import { SxProps, Theme } from "@mui/material"

export const bottomNavigationSx: SxProps<Theme> = (theme) => ({
  borderTop: `1px solid ${theme.palette.primary.light}`,
  boxShadow: `0px 20px 20px 8px ${theme.palette.text.primary}`,
  height: "60px",
  [theme.breakpoints.down("s")]: {
    height: "48px",
  },
})

// TODO: Move to theme.
export const bottomNavigationActionSx: SxProps<Theme> = ({ palette }) => ({
  "& .MuiSvgIcon-root": {
    fill: palette.primary.light,
    height: "1.5rem",
    transition: "height 0.2s linear, width 0.2s linear, fill 0.2s linear",
    width: "1.5rem",
  },
  "&.Mui-selected .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    height: "2.2rem",
    width: "2.2rem",
  },
  "&:hover .MuiSvgIcon-root": {
    fill: palette.primary.dark,
    transition: "fill 0.2s linear",
  },
  maxWidth: "100%",
  minWidth: "40px",
  padding: "8px",
})
