import { styled } from "@mui/material"

const DialogFooter = styled("div")(({ theme }) => ({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(auto-fill, 1fr)",
  "& > button": {
    width: "auto",
  },
  [theme.breakpoints.up("s")]: {
    "& > button:only-of-type": {
      marginLeft: "50%",
    },
  },
  [theme.breakpoints.down("s")]: {
    position: "absolute",
    bottom: "0",
    gridAutoFlow: "row",
    width: "100vw",
  },
}))

DialogFooter.displayName = "DialogFooter"

export { DialogFooter }
