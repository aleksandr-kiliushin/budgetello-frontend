import { Breadcrumbs, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import React from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { Loader } from "#components/Loader"
import { getRecordsTc } from "#models/budget"
import { LoadingStatus } from "#src/constants/shared"
import { useAppDispatch, useAppSelector } from "#utils/hooks"
import { IBoardsRouteParams } from "#views/boards/types"

import { RecordFormModal } from "./RecordFormModal"
import { RecordTableRow } from "./RecordTableRow"
import { Header, StyledTableContainer, StyledTableHead } from "./components"

export const BoardRecords: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<IBoardsRouteParams>()

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const [isRecordCreatingModalShown, setIsRecordCreatingModalShown] = React.useState(false)

  const records = useAppSelector((state) => state.budget.records[isTrash ? "trashed" : "notTrashed"])

  const loaderRef = React.useRef(null)

  const getBoardsResponse = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  React.useEffect(() => {
    if (params.boardId === undefined) return
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

  if (params.boardId === undefined) return <Navigate replace to="/boards" />
  if (getBoardsResponse.data === undefined) return null

  const { board } = getBoardsResponse.data

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate replace to={`/boards/${params.boardId}/records?isTrash=false`} />
  }

  const onIsTrashClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`/boards/${params.boardId}/records?isTrash=${event.target.checked}`, { replace: true })
  }

  const openRecordCreationModal = (): void => {
    setIsRecordCreatingModalShown(true)
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "18px" }}>
        <Link to="/boards">boards</Link>
        <Link css={{ fontWeight: "bold" }} to={`/boards/${board.id}/records`}>
          {board.name}
        </Link>
      </Breadcrumbs>
      <Link
        css={{ display: "block", width: "fit-content", marginLeft: "auto", fontSize: "18px" }}
        to={`/boards/${params.boardId}/settings`}
      >
        Board settings
      </Link>
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
              <RecordTableRow isTrash={isTrash} key={record.id} record={record} />
            ))}
            {records.status === LoadingStatus.Completed ? null : <Loader Component={"tr"} ref={loaderRef} />}
          </TableBody>
        </Table>
      </StyledTableContainer>
      {isRecordCreatingModalShown ? (
        <RecordFormModal closeModal={(): void => setIsRecordCreatingModalShown(false)} record={null} />
      ) : null}
    </>
  )
}
