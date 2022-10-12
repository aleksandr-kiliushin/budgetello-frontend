import { Box } from "@mui/material"
import React from "react"

const DialogFooter: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box sx={{ backgroundColor: "lightblue" }}>{children}</Box>
}

DialogFooter.displayName = "DialogFooter"

export { DialogFooter }
