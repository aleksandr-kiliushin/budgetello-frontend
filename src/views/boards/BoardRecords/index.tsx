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
import { useGetBudgetRecordsQuery } from "#api/budget"
import { IBoardsRouteParams } from "#views/boards/types"

import { RecordFormModal } from "./RecordFormModal"
import { RecordTableRow } from "./RecordTableRow"
import { Header, StyledTableContainer, StyledTableHead } from "./components"

export const BoardRecords: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<IBoardsRouteParams>()

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const [isRecordCreatingModalShown, setIsRecordCreatingModalShown] = React.useState(false)

  const getRecordsResponse = useGetBudgetRecordsQuery({
    variables: {
      boardsIds: [Number(params.boardId)],
      isTrashed: isTrash,
      orderingByDate: "DESC",
      orderingById: "DESC",
      skip: 0,
      take: 50,
    },
  })

  const getBoardResponse = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  if (params.boardId === undefined) return <Navigate replace to="/boards" />

  if (getBoardResponse.data === undefined) return null
  if (getRecordsResponse.data === undefined) return null

  const board = getBoardResponse.data.board
  const records = getRecordsResponse.data.budgetRecords

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
            {records.map((record) => (
              <RecordTableRow isTrash={isTrash} key={record.id} record={record} />
            ))}
            <tr>
              <td>
                <button
                  onClick={() => {
                    getRecordsResponse.fetchMore({
                      variables: {
                        skip: getRecordsResponse.data === undefined ? 0 : getRecordsResponse.data.budgetRecords.length,
                      },
                      updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
                        budgetRecords: [...previousQueryResult.budgetRecords, ...fetchMoreResult.budgetRecords],
                      }),
                    })
                  }}
                >
                  Fetch more
                </button>
              </td>
            </tr>
          </TableBody>
        </Table>
      </StyledTableContainer>
      {isRecordCreatingModalShown ? (
        <RecordFormModal closeModal={(): void => setIsRecordCreatingModalShown(false)} record={null} />
      ) : null}
    </>
  )
}
