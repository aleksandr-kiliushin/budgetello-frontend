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

import { getCategoriesTc, getCategoryTypesTc } from "#models/budget"
import { IBoard } from "#types/boards"
import { Http } from "#utils/Http"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import { IBoardsRouteParams } from "../types"
import { CategoryFormModal } from "./CategoryFormModal"
import { CategoryTableRow } from "./CategoryTableRow"

export const BoardSettings: React.FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams<IBoardsRouteParams>()
  const [isCategoryCreatingModalShown, toggleIsCategoryCreatingModalShown] = useToggle(false)

  const categories = useAppSelector((state) => state.budget.categories)
  const categoryTypes = useAppSelector((state) => state.budget.categoryTypes)

  React.useEffect(() => {
    if (params.boardId === undefined) return
    dispatch(getCategoriesTc({ boardId: parseInt(params.boardId) }))
    dispatch(getCategoryTypesTc())
  }, [])

  const [board, setBoard] = React.useState<IBoard | undefined>(undefined)
  React.useEffect(() => {
    if (params.boardId === undefined) return
    Http.get({ url: "/api/boards/" + params.boardId })
      .then((response) => response.json())
      .then(setBoard)
  }, [params.boardId])

  if (board === undefined) return null

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "18px" }}>
        <Link to="/boards">boards</Link>
        <Link to={`/boards/${board.id}/records`}>{board.name}</Link>
        <Link css={{ color: "green" }} to={`/boards/${board.id}/settings`}>
          Settings
        </Link>
      </Breadcrumbs>
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
              <CategoryTableRow category={category} categoryTypes={categoryTypes.items} key={category.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isCategoryCreatingModalShown && (
        <CategoryFormModal
          category={null}
          categoryTypes={categoryTypes.items}
          closeModal={toggleIsCategoryCreatingModalShown}
        />
      )}
    </>
  )
}
