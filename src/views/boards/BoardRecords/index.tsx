import {
  Breadcrumbs,
  Button,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material"
import React from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { useToggle } from "react-use"

import { useGetBoardQuery } from "#api/boards"
import { useGetBudgetRecordsQuery } from "#api/budget"
import { IBoardsRouteParams } from "#views/boards/types"

import { RecordFormDialog } from "./RecordFormDialog"
import { RecordTableRow } from "./RecordTableRow"
import { Header, StyledTableContainer, StyledTableHead } from "./components"

export const BoardRecords: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<IBoardsRouteParams>()

  const [isRecordCreatingDialogShown, toggleIsRecordCreatingDialogShown] = useToggle(false)

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const getRecordsResult = useGetBudgetRecordsQuery({
    variables: {
      boardsIds: [Number(params.boardId)],
      isTrashed: isTrash,
      orderingByDate: "DESC",
      orderingById: "DESC",
      skip: 0,
      take: 50,
    },
  })

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  if (params.boardId === undefined) return <Navigate replace to="/boards" />

  if (!getBoardResult.data) return null
  if (!getRecordsResult.data) return null

  const board = getBoardResult.data.board
  const records = getRecordsResult.data.budgetRecords

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate replace to={`/boards/${params.boardId}/records?isTrash=false`} />
  }

  const onIsTrashClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`/boards/${params.boardId}/records?isTrash=${event.target.checked}`, { replace: true })
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
                  <Button id="add-record" onClick={toggleIsRecordCreatingDialogShown} variant="outlined">
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
                    getRecordsResult.fetchMore({
                      variables: {
                        skip: getRecordsResult.data ? getRecordsResult.data.budgetRecords.length : 0,
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
      {isRecordCreatingDialogShown && (
        <RecordFormDialog closeDialog={toggleIsRecordCreatingDialogShown} record={null} />
      )}
    </>
  )
}
