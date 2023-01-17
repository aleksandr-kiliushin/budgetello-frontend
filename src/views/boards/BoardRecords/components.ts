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
  "& td:nth-of-type(1)": { width: "23%" },
  "& td:nth-of-type(2)": { width: "33%" },
  "& td:nth-of-type(3)": { width: "24%" },
  "& td:nth-of-type(4)": { width: "10%" },
  "& td:nth-of-type(5)": { width: "10%" },
})

export const StyledTableHead = styled(TableHead)(({ theme }) => ({
  zIndex: 1,
  position: "sticky",
  top: "-12px",
  backgroundColor: theme.palette.background.default,
  boxShadow: `0px 14px 24px -13px ${theme.palette.text.primary}`,
}))
