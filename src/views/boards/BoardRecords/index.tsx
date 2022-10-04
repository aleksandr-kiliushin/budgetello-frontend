import { Typography } from "@mui/material"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import React from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { Loader } from "#components/Loader"
import { getCategoriesTc, getRecordsTc } from "#models/budgeting"
import { LoadingStatus } from "#src/constants/shared"
import { IBoard } from "#types/boards"
import { Http } from "#utils/Http"
import { useAppDispatch, useAppSelector } from "#utils/hooks"
import { IBoardsRouteParams } from "#views/boards/types"

import { RecordFormModal } from "./RecordFormModal"
import { RecordTableRow } from "./RecordTableRow"
import { Header, StyledTableContainer, StyledTableHead } from "./components"

export const BoardRecords: React.FC = () => {
  const [board, setBoard] = React.useState<IBoard | undefined>(undefined)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<IBoardsRouteParams>()

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const [isRecordCreatingModalShown, setIsRecordCreatingModalShown] = React.useState(false)

  const categories = useAppSelector((state) => state.budgeting.categories)
  const records = useAppSelector((state) => state.budgeting.records[isTrash ? "trashed" : "notTrashed"])

  const loaderRef = React.useRef(null)

  React.useEffect(() => {
    if (params.boardId === undefined) return
    Http.get({ url: "/api/boards/" + params.boardId })
      .then((response) => response.json())
      .then(setBoard)
  }, [params.boardId])

  React.useEffect(() => {
    if (params.boardId === undefined) return
    dispatch(getCategoriesTc({ boardId: parseInt(params.boardId) }))
    dispatch(getRecordsTc({ boardId: parseInt(params.boardId), isTrash: false }))
    dispatch(getRecordsTc({ boardId: parseInt(params.boardId), isTrash: true }))
  }, [])

  React.useEffect(() => {
    const observer = new IntersectionObserver(() => {
      if (params.boardId === undefined) return
      dispatch(getRecordsTc({ boardId: parseInt(params.boardId), isTrash }))
    })
    if (loaderRef.current !== null) {
      observer.observe(loaderRef.current)
    }
    return (): void => {
      if (loaderRef.current !== null) {
        observer.unobserve(loaderRef.current)
      }
    }
  }, [getRecordsTc, isTrash, loaderRef.current])

  if (params.boardId === undefined) return <Navigate to="/boards" />
  if (board === undefined) return null

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate to={`/boards/${params.boardId}/records?isTrash=false`} />
  }

  const onIsTrashClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`/boards/${params.boardId}/records?isTrash=${event.target.checked}`)
  }

  const openRecordCreationModal = (): void => {
    setIsRecordCreatingModalShown(true)
  }

  return (
    <>
      <Link to="/boards">{"<"} Back to boards</Link>
      <br />
      <Link to={`/boards/${params.boardId}/settings`}>Board settings</Link>
      <Typography variant="h1">
        Board #{board.id}: {board.name}
      </Typography>
      <Header>
        <FormControlLabel
          control={<Switch checked={isTrash} onChange={onIsTrashClick} />}
          label="Trash"
          labelPlacement="start"
          name="isTrash"
          sx={{ margin: 0 }}
        />
      </Header>
      <StyledTableContainer>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <TableCell variant="head" width="23%">
                Amount
              </TableCell>
              <TableCell variant="head" width="29%">
                Category
              </TableCell>
              <TableCell variant="head" width="24%">
                Date
              </TableCell>
              <TableCell colSpan={2} width="24%">
                {isTrash ? null : (
                  <Button id="add-record" onClick={openRecordCreationModal} variant="outlined">
                    +New
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {records.items.map((record) => (
              <RecordTableRow categories={categories.items} isTrash={isTrash} key={record.id} record={record} />
            ))}
            {records.status === LoadingStatus.Completed ? null : <Loader Component={"tr"} ref={loaderRef} />}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {isRecordCreatingModalShown ? (
        <RecordFormModal
          categories={categories.items}
          closeModal={(): void => setIsRecordCreatingModalShown(false)}
          record={null}
        />
      ) : null}
    </>
  )
}
