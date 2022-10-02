import styled from "@emotion/styled"
import Box from "@mui/material/Box"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
`

export const StyledTableContainer = styled(TableContainer)`
  overflow-x: visible; // To allow th to be sticky.
`

export const StyledTableHead = styled(TableHead)`
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0px 10px 20px -10px lightgray;
`
