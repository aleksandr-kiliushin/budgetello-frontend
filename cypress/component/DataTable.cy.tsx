import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { FC } from "react"

import { DataLayout } from "#components/DataLayout"

// eslint-disable-next-line max-params
const createData = (name: string, calories: number, fat: number, carbs: number, protein: number) => {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
]

const SampleComponentWithDataLayout: FC = () => {
  return (
    <DataLayout>
      <DataLayout.Heading variant="h1">Products</DataLayout.Heading>
      <DataLayout.Controls>
        <Button variant="outlined">Add</Button>
        <Button variant="outlined">Settings</Button>
        <Button variant="outlined">Refresh</Button>
      </DataLayout.Controls>
      <DataLayout.TableContainer columnsWidths={["40%", "15%", "15%", "15%", "15%"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DataLayout.TableContainer>
    </DataLayout>
  )
}

describe("DataLayout", () => {
  it("open-close works", () => {
    cy.viewport(600, 600)
    cy.mount(<SampleComponentWithDataLayout />)
  })
})
