import { Add as AddIcon, Settings as SettingsIcon } from "@mui/icons-material"
import { Button, FormControlLabel, Switch, Table, TableCell, TableHead, TableRow } from "@mui/material"
import React from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { useGetBudgetRecordsQuery } from "#api/budget"
import { useGetUserQuery } from "#api/users"
import { DataLayout } from "#components/DataLayout"
import { TableBody } from "#components/TableBody"

import { RecordFormDialog } from "./RecordFormDialog"
import { RecordTableRow } from "./RecordTableRow"

export const BoardRecords: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<{ boardId: string }>()

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

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

  const authorizedUser = getAuthorizedUserResult.data?.user
  const board = getBoardResult.data?.board
  const records = getRecordsResult.data?.budgetRecords

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate replace to={`${location.pathname}?isTrash=false`} />
  }

  const onIsTrashClick = (event: React.ChangeEvent<HTMLInputElement>): void => {
    navigate(`/boards/${params.boardId}/records?isTrash=${event.target.checked}`, { replace: true })
  }

  return (
    <>
      <DataLayout>
        <DataLayout.Heading variant="h1">Board «{board?.name}»</DataLayout.Heading>
        <DataLayout.Controls>
          <FormControlLabel
            control={<Switch checked={isTrash} onChange={onIsTrashClick} />}
            label="Trash"
            labelPlacement="start"
            name="isTrash"
            sx={{ margin: 0 }}
          />
          {board?.admins.some((admin) => admin.id === authorizedUser?.id) && (
            <Button
              component={Link}
              startIcon={<SettingsIcon />}
              to={`/boards/${params.boardId}/settings`}
              variant="outlined"
            />
          )}
          {isTrash === false && (
            <Button
              component={Link}
              id="add-record"
              startIcon={<AddIcon />}
              to={`/boards/${params.boardId}/records/add${location.search}`}
              variant="outlined"
            />
          )}
        </DataLayout.Controls>
        <DataLayout.TableContainer columnsWidths={["23%", "33%", "24%", "10%", "10%"]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Amount</TableCell>
                <TableCell variant="head">Category</TableCell>
                <TableCell variant="head">Date</TableCell>
                <TableCell variant="head" />
                <TableCell variant="head" />
              </TableRow>
            </TableHead>
            <TableBody>
              {records?.map((record) => (
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
        </DataLayout.TableContainer>
      </DataLayout>
      {location.pathname.endsWith("/add") && <RecordFormDialog record={undefined} />}
    </>
  )
}
