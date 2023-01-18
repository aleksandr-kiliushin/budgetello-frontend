import { Add as AddIcon } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"
import { useToggle } from "react-use"

import { useGetBudgetCategoriesQuery } from "#api/budget"

import { CategoryFormDialog } from "./CategoryFormDialog"
import { CategoryTableRow } from "./CategoryTableRow"
import { Members } from "./Members"
import { StyledCategoriesTableContainer } from "./components"

export const BoardSettings: React.FC = () => {
  const params = useParams<{ boardId: string }>()
  const [isCategoryCreatingDialogShown, toggleIsCategoryCreatingDialogShown] = useToggle(false)

  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)] },
  })

  const boardBudgetCategories = getBoardBudgetCategoriesResult.data?.budgetCategories

  return (
    <>
      <Typography variant="h2">Budget categories</Typography>
      <br />
      <div>
        <Button
          id="add-category"
          onClick={toggleIsCategoryCreatingDialogShown}
          startIcon={<AddIcon />}
          variant="outlined"
        />
      </div>
      <br />
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
      <br />
      <Members />
      {isCategoryCreatingDialogShown && (
        <CategoryFormDialog category={undefined} closeDialog={toggleIsCategoryCreatingDialogShown} />
      )}
    </>
  )
}
