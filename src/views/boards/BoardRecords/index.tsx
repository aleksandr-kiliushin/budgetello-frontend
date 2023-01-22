import { Add as AddIcon, Settings as SettingsIcon } from "@mui/icons-material"
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react"
import { Link, Navigate, useLocation, useNavigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { useGetBudgetRecordsQuery } from "#api/budget"
import { useGetUserQuery } from "#api/users"
import { DataLayout } from "#components/DataLayout"
import { TableBody } from "#components/TableBody"

import { RecordFormDialog } from "./RecordFormDialog"
import { RecordTableRow } from "./RecordTableRow"

export const BoardRecords: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams<{ boardId: string }>()

  const [areAllRecordsLoaded, setAreAllRecordsLoaded] = useState(false)

  const searchParams = new URLSearchParams(location.search)
  const isTrash = searchParams.get("isTrash") === "true"

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })
  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const getRecordsResult = useGetBudgetRecordsQuery({
    variables: {
      boardsIds: [Number(params.boardId)],
      isTrashed: isTrash,
      orderingByDate: "DESC",
      orderingById: "DESC",
      skip: 0,
      take: 50,
    },
    onCompleted: ({ budgetRecords }) => {
      if (budgetRecords.length === 0 || budgetRecords.length % 50 !== 0) {
        setAreAllRecordsLoaded(true)
      }
    },
  })

  const authorizedUser = getAuthorizedUserResult.data?.user
  const board = getBoardResult.data?.board
  const records = getRecordsResult.data?.budgetRecords

  const containerRef = useRef<HTMLSpanElement | null>(null)
  useEffect(() => {
    const loadNextRecordsPage = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (!entry.isIntersecting) return
      getRecordsResult.fetchMore({
        variables: {
          skip: records ? records.length : 0,
        },
        updateQuery: (previousQueryResult, { fetchMoreResult }) => ({
          budgetRecords: [...previousQueryResult.budgetRecords, ...fetchMoreResult.budgetRecords],
        }),
      })
    }

    const container = containerRef.current
    const observer = new IntersectionObserver(loadNextRecordsPage, { root: null, rootMargin: "0px", threshold: 1.0 })
    if (container !== null) observer.observe(container)
    return () => {
      if (container !== null) observer.unobserve(container)
    }
  }, [containerRef, getRecordsResult, records])

  if (params.boardId === undefined) return <Navigate replace to="/boards" />

  if (location.search !== "?isTrash=false" && location.search !== "?isTrash=true") {
    return <Navigate replace to={`${location.pathname}?isTrash=false`} />
  }

  const onIsTrashClick = (event: ChangeEvent<HTMLInputElement>) => {
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
              {!areAllRecordsLoaded && !getRecordsResult.loading && (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center" }}>
                    <CircularProgress ref={containerRef} size={26} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DataLayout.TableContainer>
      </DataLayout>
      {location.pathname.endsWith("/add") && <RecordFormDialog record={undefined} />}
    </>
  )
}
