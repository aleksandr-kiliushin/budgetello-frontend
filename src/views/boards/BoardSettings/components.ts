import { TableContainer, styled } from "@mui/material"

export const StyledCategoriesTableContainer = styled(TableContainer)({
  "& td:nth-of-type(1)": { width: "40%" },
  "& td:nth-of-type(2)": { width: "40%" },
  "& td:nth-of-type(3)": { width: "10%" },
  "& td:nth-of-type(4)": { width: "10%" },
})

export const StyledMembersTableContainer = styled(TableContainer)({
  "& td:nth-of-type(1)": { width: "90%" },
  "& td:nth-of-type(2)": { width: "10%" },
})
