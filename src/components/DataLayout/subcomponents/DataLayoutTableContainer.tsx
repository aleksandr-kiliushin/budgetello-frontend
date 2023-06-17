import { TableContainer } from "@mui/material"
import { FC, PropsWithChildren, createContext } from "react"

type TDataLayoutTableContainerContext = {
  columnsAmount: number
}
export const DateLayoutTableContainerContext = createContext<TDataLayoutTableContainerContext>({
  columnsAmount: 0,
})

type TDataLayoutTableProps = {
  columnsWidths: string[]
}

const DataLayoutTableContainer: FC<PropsWithChildren<TDataLayoutTableProps>> = ({ children, columnsWidths }) => {
  const columnWidthByCellSelector: Record<string, { width: string }> = {}
  columnsWidths.forEach((columnWidth, columnWidthIndex) => {
    columnWidthByCellSelector[`& td:nth-of-type(${columnWidthIndex + 1})`] = { width: columnWidth }
  })

  return (
    <DateLayoutTableContainerContext.Provider value={{ columnsAmount: columnsWidths.length }}>
      <TableContainer css={{ ...columnWidthByCellSelector }}>{children}</TableContainer>
    </DateLayoutTableContainerContext.Provider>
  )
}

DataLayoutTableContainer.displayName = "DataLayoutTableContainer"

export { DataLayoutTableContainer }
