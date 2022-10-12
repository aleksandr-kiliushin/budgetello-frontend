import { Box } from "@mui/material"
import React from "react"

const DialogHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box sx={{ backgroundColor: "linen" }}>{children}</Box>
}

DialogHeader.displayName = "DialogHeader"

export { DialogHeader }
