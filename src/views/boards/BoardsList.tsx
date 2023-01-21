import { Add as AddIcon, Settings as SettingsIcon } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"
import { Link, useLocation } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"
import { useGetUserQuery } from "#api/users"
import { DataLayout } from "#components/DataLayout"

import { CreateBoardFormDialog } from "./CreateBoardFormDialog"

export const BoardsList: React.FC = () => {
  const location = useLocation()

  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  const participatedBoards = getParticipatedBoardsResult.data?.boards
  const nonParticipatedBoards = getNonParticipatedBoardsResult.data?.boards
  const authorizedUser = getAuthorizedUserResult.data?.user

  return (
    <>
      <DataLayout>
        <DataLayout.Heading variant="h2">Your boards</DataLayout.Heading>
        <DataLayout.Controls>
          <Button component={Link} startIcon={<AddIcon />} to="/boards/create" variant="outlined" />
        </DataLayout.Controls>
        <DataLayout.TableContainer columnsWidths={["90%", "10%"]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Name</TableCell>
                <TableCell variant="head" />
              </TableRow>
            </TableHead>
            <TableBody>
              {participatedBoards?.map((board) => (
                <TableRow key={board.id}>
                  <TableCell>
                    <Link to={`/boards/${board.id}/records`}>{board.name}</Link>
                  </TableCell>
                  <TableCell>
                    {board.admins.some((admin) => admin.id === authorizedUser?.id) && (
                      <Button
                        component={Link}
                        size="small"
                        startIcon={<SettingsIcon />}
                        to={`/boards/${board.id}/settings`}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataLayout.TableContainer>
      </DataLayout>
      <br />
      <DataLayout>
        <DataLayout.Heading variant="h2">Other boards</DataLayout.Heading>
        <DataLayout.TableContainer columnsWidths={["100%"]}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell variant="head">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nonParticipatedBoards?.map((board) => (
                <TableRow key={board.id}>
                  <TableCell>{board.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DataLayout.TableContainer>
      </DataLayout>
      {location.pathname.endsWith("/create") && <CreateBoardFormDialog />}
    </>
  )
}
