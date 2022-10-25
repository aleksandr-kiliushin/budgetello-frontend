import { styled } from "@mui/material"

const DialogFooter = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(auto-fill, 1fr)",
  "& > button": {
    width: "auto",
  },
  "& > button:only-of-type": {
    marginLeft: "50%",
  },
})

DialogFooter.displayName = "DialogFooter"

export { DialogFooter }
