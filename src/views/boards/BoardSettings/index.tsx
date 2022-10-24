import { Breadcrumbs, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import React from "react"
import { Link, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { useGetBudgetCategoriesQuery } from "#api/budget"
import { useDialog } from "#components/useDialog"

import { IBoardsRouteParams } from "../types"
import { CategoryFormModal } from "./CategoryFormModal"
import { CategoryTableRow } from "./CategoryTableRow"
import { Members } from "./Members"

export const BoardSettings: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()
  const [, openBudgetCategoryFormDialog] = useDialog({ id: "budget-category-form-dialog" })

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
                <Button onClick={openBudgetCategoryFormDialog} variant="outlined">
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
      <CategoryFormModal category={undefined} />
      <Members />
    </>
  )
}
