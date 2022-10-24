import { Breadcrumbs, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { useToggle } from "react-use"

import { useGetBoardQuery } from "#api/boards"
import { useGetBudgetCategoriesQuery } from "#api/budget"

import { IBoardsRouteParams } from "../types"
import { CategoryFormDialog } from "./CategoryFormDialog"
import { CategoryTableRow } from "./CategoryTableRow"
import { Members } from "./Members"

export const BoardSettings: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()
  const [isCategoryCreatingDialogShown, toggleIsCategoryCreatingDialogShown] = useToggle(false)

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const getBoardBudgetCategoriesResult = useGetBudgetCategoriesQuery({
    variables: { boardsIds: [Number(params.boardId)] },
  })

  if (!getBoardResult.data) return null
  if (!getBoardBudgetCategoriesResult.data) return null

  const board = getBoardResult.data.board
  const boardBudgetCategories = getBoardBudgetCategoriesResult.data.budgetCategories

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "18px" }}>
        <Link to="/boards">boards</Link>
        <Link to={`/boards/${board.id}/records`}>{board.name}</Link>
        <Link css={{ fontWeight: "bold" }} to={`/boards/${board.id}/settings`}>
          Settings
        </Link>
      </Breadcrumbs>
      <h2>Budget categories</h2>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head" width="38%">
                Category
              </TableCell>
              <TableCell variant="head" width="38%">
                Type
              </TableCell>
              <TableCell colSpan={2} width="24%">
                <Button onClick={toggleIsCategoryCreatingDialogShown} variant="outlined">
                  +New
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boardBudgetCategories.map((category) => (
              <CategoryTableRow category={category} key={category.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCategoryCreatingDialogShown && (
        <CategoryFormDialog category={undefined} closeDialog={toggleIsCategoryCreatingDialogShown} />
      )}
      <Members />
    </>
  )
}
