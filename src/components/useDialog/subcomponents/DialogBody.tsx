import { Box } from "@mui/material"
import React from "react"

const DialogBody: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Box sx={{ backgroundColor: "burlywood" }}>{children}</Box>
}

DialogBody.displayName = "DialogBody"

export { DialogBody }
