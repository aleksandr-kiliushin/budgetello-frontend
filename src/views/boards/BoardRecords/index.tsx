import { Add as AddIcon, Settings as SettingsIcon } from "@mui/icons-material"
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
import { ControlsPanel, StyledTableContainer, StyledTableHead } from "./components"

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
      <Breadcrumbs>
        <Link to="/boards">Boards</Link>
        <Link css={{ fontWeight: "bold" }} to={`/boards/${board.id}/records`}>
          {board.name}
        </Link>
      </Breadcrumbs>
      <br />
      <Typography variant="h1">Board «{board.name}»</Typography>
      <br />
      <ControlsPanel>
        <FormControlLabel
          control={<Switch checked={isTrash} onChange={onIsTrashClick} />}
          label="Trash"
          labelPlacement="start"
          name="isTrash"
          sx={{ margin: 0 }}
        />
        <Button href={`/boards/${params.boardId}/settings`} startIcon={<SettingsIcon />} variant="outlined" />
        {isTrash === false && (
          <Button
            id="add-record"
            onClick={toggleIsRecordCreatingDialogShown}
            startIcon={<AddIcon />}
            variant="outlined"
          />
        )}
      </ControlsPanel>
      <br />
      <StyledTableContainer>
        <Table size="small">
          <StyledTableHead>
            <TableRow>
              <TableCell variant="head">Amount</TableCell>
              <TableCell variant="head">Category</TableCell>
              <TableCell variant="head">Date</TableCell>
              <TableCell />
              <TableCell />
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
        <RecordFormDialog closeDialog={toggleIsRecordCreatingDialogShown} record={undefined} />
      )}
    </>
  )
}
