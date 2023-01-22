import { TableBody as MuiTableBody, TableCell as MuiTableCell, TableRow as MuiTableRow } from "@mui/material"
import React, { Children, FC, PropsWithChildren } from "react"

interface ITableBodyProps {
  columnsWidths: string[]
}

export const TableBody: FC<PropsWithChildren<ITableBodyProps>> = ({ children, columnsWidths }) => {
  const passedRowsAmount = Children.toArray(children).length

  const columnWidthByCellSelector: Record<string, { width: string }> = {}
  columnsWidths.forEach((columnWidth, columnWidthIndex) => {
    columnWidthByCellSelector[`& td:nth-of-type(${columnWidthIndex + 1})`] = { width: columnWidth }
  })

  if (passedRowsAmount === 0) {
    return (
      <MuiTableBody css={{ ...columnWidthByCellSelector }}>
        <MuiTableRow>
          <MuiTableCell colSpan={columnsWidths.length} sx={{ color: "GrayText", textAlign: "center" }}>
            Empty
          </MuiTableCell>
        </MuiTableRow>
      </MuiTableBody>
    )
  }

  return <MuiTableBody css={{ ...columnWidthByCellSelector }}>{children}</MuiTableBody>
}
