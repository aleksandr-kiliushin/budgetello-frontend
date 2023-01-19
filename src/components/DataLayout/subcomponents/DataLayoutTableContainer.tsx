import { TableContainer, TableContainerProps } from "@mui/material"
import React, { FC, PropsWithChildren } from "react"

interface IDataLayoutTableProps extends TableContainerProps {
  columnsWidths: string[]
}

const DataLayoutTableContainer: FC<PropsWithChildren<IDataLayoutTableProps>> = ({
  children,
  columnsWidths,
  ...restProps
}) => {
  const columnWidthByCellSelector: Record<string, { width: string }> = {}
  columnsWidths.forEach((columnWidth, columnWidthIndex) => {
    columnWidthByCellSelector[`& td:nth-of-type(${columnWidthIndex + 1})`] = { width: columnWidth }
  })

  return (
    <TableContainer css={{ ...columnWidthByCellSelector }} {...restProps}>
      {children}
    </TableContainer>
  )
}

DataLayoutTableContainer.displayName = "DataLayoutTableContainer"

export { DataLayoutTableContainer }
