import { Add as AddIcon } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React, { FC } from "react"
import { Link, useLocation, useParams } from "react-router-dom"

import { useGetBudgetCategoriesQuery } from "#api/budget"

import { CategoryFormDialog } from "./CategoryFormDialog"
import { CategoryTableRow } from "./CategoryTableRow"
import { StyledCategoriesTableContainer } from "./components"

export const BudgetCategoriesSettings: FC = () => {
  const location = useLocation()
  const params = useParams<{ boardId: string }>()

  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)] },
  })

  const boardBudgetCategories = getBoardBudgetCategoriesResult.data?.budgetCategories

  return (
    <>
      <Typography gutterBottom variant="h2">
        Budget categories
      </Typography>
      <div>
        <Button
          component={Link}
          id="add-category"
          startIcon={<AddIcon />}
          to={`/boards/${params.boardId}/settings/add-budget-category`}
          variant="outlined"
        />
      </div>
      <StyledCategoriesTableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Category</TableCell>
              <TableCell variant="head">Type</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {boardBudgetCategories?.map((category) => (
              <CategoryTableRow category={category} key={category.id} />
            ))}
          </TableBody>
        </Table>
      </StyledCategoriesTableContainer>
      {location.pathname.endsWith("/add-budget-category") && <CategoryFormDialog category={undefined} />}
    </>
  )
}
