import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { FC } from "react"

import { DataLayout } from "#components/DataLayout"

import { BoardNameRow } from "./BoardNameRow"

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
          </TableBody>
        </Table>
      </DataLayout.TableContainer>
    </DataLayout>
  )
}
