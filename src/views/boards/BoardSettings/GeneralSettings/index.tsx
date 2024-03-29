import { Table, TableCell, TableHead, TableRow } from "@mui/material"
import { FC } from "react"

import { DataLayout } from "#components/DataLayout"
import { TableBody } from "#components/TableBody"

import { BoardNameRow } from "./BoardNameRow"
import { DefaultCurrencyRow } from "./DefaultCurrencyRow"

export const GeneralSettings: FC = () => {
  return (
    <DataLayout>
      <DataLayout.Heading variant="h2">General</DataLayout.Heading>
      <DataLayout.TableContainer columnsWidths={["30%", "50%", "10%", "10%"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell variant="head">Parameter</TableCell>
              <TableCell variant="head">Value</TableCell>
              <TableCell variant="head" />
              <TableCell variant="head" />
            </TableRow>
          </TableHead>
          <TableBody>
            <BoardNameRow />
            <DefaultCurrencyRow />
          </TableBody>
        </Table>
      </DataLayout.TableContainer>
    </DataLayout>
  )
}
