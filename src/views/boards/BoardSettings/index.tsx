import { Breadcrumbs } from "@mui/material"
import Button from "@mui/material/Button"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import React from "react"
import { Link, useParams } from "react-router-dom"
import { useToggle } from "react-use"

import { useGetBoardQuery } from "#api/boards"
import { getCategoriesTc } from "#models/budget"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import { IBoardsRouteParams } from "../types"
import { CategoryFormModal } from "./CategoryFormModal"
import { CategoryTableRow } from "./CategoryTableRow"
import { Members } from "./Members"

export const BoardSettings: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams<IBoardsRouteParams>()
  const [isCategoryCreatingModalShown, toggleIsCategoryCreatingModalShown] = useToggle(false)

  const categories = useAppSelector((state) => state.budget.categories)

  React.useEffect(() => {
    if (params.boardId === undefined) return
    dispatch(getCategoriesTc({ boardId: parseInt(params.boardId) }))
  }, [])

  const getBoardsResponse = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  if (getBoardsResponse.data === undefined) return null
  const { board } = getBoardsResponse.data

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
                <Button onClick={toggleIsCategoryCreatingModalShown} variant="outlined">
                  +New
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.items.map((category) => (
              <CategoryTableRow category={category} key={category.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCategoryCreatingModalShown && (
        <CategoryFormModal category={null} closeModal={toggleIsCategoryCreatingModalShown} />
      )}
      <Members />
    </>
  )
}
