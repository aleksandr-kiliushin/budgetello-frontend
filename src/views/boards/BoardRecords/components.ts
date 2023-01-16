import { TableContainer, TableHead, styled } from "@mui/material"

export const ControlsPanel = styled("div")({
  display: "grid",
  gridAutoFlow: "column",
  alignItems: "center",
  justifyContent: "start",
  columnGap: "8px",
  maxWidth: "100%",
})

export const StyledTableContainer = styled(TableContainer)({
  overflowX: "visible", // Makes thead sticky.
})

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: "0",
  backgroundColor: theme.palette.background.default,
  boxShadow: `0px 20px 20px -24px ${theme.palette.text.primary}`,
}))
