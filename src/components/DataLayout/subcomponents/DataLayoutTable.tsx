import { Table, TableContainer } from "@mui/material"
import React, { FC, PropsWithChildren } from "react"

interface IDataLayoutTableProps {
  columnsWidths: string[]
}

const DataLayoutTable: FC<PropsWithChildren<IDataLayoutTableProps>> = ({ children, columnsWidths }) => {
  const columnWidthByCellSelector: Record<string, { width: string }> = {}
  columnsWidths.forEach((columnWidth, columnWidthIndex) => {
    columnWidthByCellSelector[`& td:nth-of-type(${columnWidthIndex})`] = { width: columnWidth }
  })

  return (
    <TableContainer sx={{ ...columnWidthByCellSelector }}>
      <Table>{children}</Table>
    </TableContainer>
  )
}

DataLayoutTable.displayName = "DataLayoutTable"

export { DataLayoutTable }
