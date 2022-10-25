import { TableContainer, TableHead, styled } from "@mui/material"

export const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: "100vw",
})

export const StyledTableContainer = styled(TableContainer)({
  overflowX: "visible", // To allow th to be sticky.
})

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  position: "sticky",
  top: "0",
  backgroundColor: theme.palette.background.default,
  boxShadow: "0px 10px 20px -10px lightgray",
}))
