import { Add as AddIcon } from "@mui/icons-material"
import { Button, Table, TableCell, TableHead, TableRow } from "@mui/material"
import { FC } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import { useGetBudgetCategoriesQuery } from "#api/budget/index.generated"
import { DataLayout } from "#components/DataLayout"
import { TableBody } from "#components/TableBody"

import { CategoryFormDialog } from "./CategoryFormDialog"
import { CategoryTableRow } from "./CategoryTableRow"

export const BudgetCategoriesSettings: FC = () => {
  const location = useLocation()
  const params = useParams<{ boardId: string }>()

  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)], orderingById: "DESC" },
  })

  const boardBudgetCategories = getBoardBudgetCategoriesResult.data?.budgetCategories

  return (
    <>
      <DataLayout>
        <DataLayout.Heading variant="h2">Budget categories</DataLayout.Heading>
        <DataLayout.Controls>
          <Button
            aria-label="Add budget category"
            component={Link}
            role="button"
            startIcon={<AddIcon />}
            to={`/boards/${params.boardId}/settings/add-budget-category`}
            variant="outlined"
          />
        </DataLayout.Controls>
        <DataLayout.TableContainer columnsWidths={["40%", "40%", "10%", "10%"]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Name</TableCell>
                <TableCell variant="head">Type</TableCell>
                <TableCell variant="head" />
                <TableCell variant="head" />
              </TableRow>
            </TableHead>
            <TableBody>
              {boardBudgetCategories?.map((category) => (
                <CategoryTableRow category={category} key={category.id} />
              ))}
            </TableBody>
          </Table>
        </DataLayout.TableContainer>
      </DataLayout>
      {location.pathname.endsWith("/add-budget-category") && <CategoryFormDialog category={undefined} />}
    </>
  )
}
