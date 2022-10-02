import Button from "@mui/material/Button"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Typography from "@mui/material/Typography"
import { FC, Fragment, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useToggle } from "react-use"

import { getCategoriesTc, getCategoryTypesTc } from "#models/finances"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import { IBoardsRouteParams } from "../types"
import { CategoryFormModal } from "./CategoryFormModal"
import { CategoryTableRow } from "./CategoryTableRow"

export const BoardSettings: FC = () => {
  const dispatch = useAppDispatch()
  const params = useParams<IBoardsRouteParams>()
  const [isCategoryCreatingModalShown, toggleIsCategoryCreatingModalShown] = useToggle(false)

  const categories = useAppSelector((state) => state.finances.categories)
  const categoryTypes = useAppSelector((state) => state.finances.categoryTypes)

  useEffect(() => {
    if (params.boardId === undefined) return
    dispatch(getCategoriesTc({ boardId: parseInt(params.boardId) }))
    dispatch(getCategoryTypesTc())
  }, [])

  return (
    <Fragment>
      <Typography variant="h1">Settings</Typography>
      <Typography variant="h2">Finance categories</Typography>
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
      {isCategoryCreatingModalShown ? (
        <CategoryFormModal
          category={null}
          categoryTypes={categoryTypes.items}
          closeModal={toggleIsCategoryCreatingModalShown}
        />
      ) : null}
    </Fragment>
  )
}
