import { TableBody as MuiTableBody, TableCell as MuiTableCell, TableRow as MuiTableRow } from "@mui/material"
import { Children, FC, PropsWithChildren, useContext } from "react"

import { DateLayoutTableContainerContext } from "./DataLayout/subcomponents/DataLayoutTableContainer"

export const TableBody: FC<PropsWithChildren> = ({ children }) => {
  const { columnsAmount } = useContext(DateLayoutTableContainerContext)

  const rowsAmount = Children.toArray(children).length

  if (rowsAmount === 0) {
    return (
      <MuiTableBody>
        <MuiTableRow>
          <MuiTableCell colSpan={columnsAmount} sx={{ color: "GrayText", textAlign: "center" }}>
            Empty
          </MuiTableCell>
        </MuiTableRow>
      </MuiTableBody>
    )
  }

  return <MuiTableBody>{children}</MuiTableBody>
}
