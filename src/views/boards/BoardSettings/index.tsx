import { Add as AddIcon } from "@mui/icons-material"
import {
  Breadcrumbs,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
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
      <br />
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
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head" width="40%">
                Category
              </TableCell>
              <TableCell variant="head" width="40%">
                Type
              </TableCell>
              <TableCell width="10%" />
              <TableCell width="10%" />
            </TableRow>
          </TableHead>
          <TableBody>
            {boardBudgetCategories.map((category) => (
              <CategoryTableRow category={category} key={category.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Members />
      {isCategoryCreatingDialogShown && (
        <CategoryFormDialog category={undefined} closeDialog={toggleIsCategoryCreatingDialogShown} />
      )}
    </>
  )
}
