import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import React from "react"
import { useParams } from "react-router-dom"

import { useAddBoardMemberMutation, useGetBoardQuery, useRemoveBoardMemberMutation } from "#api/boards"
import { useGetUsersQuery } from "#api/users"
import { IBoardsRouteParams } from "#views/boards/types"

export const Members: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  const getAllUsersResult = useGetUsersQuery()

  const [addBoardMember] = useAddBoardMemberMutation()
  const [removeBoardMember] = useRemoveBoardMemberMutation()

  if (!getBoardResult.data) return null
  if (!getAllUsersResult.data) return null

  const board = getBoardResult.data.board

  return (
    <>
      <Typography variant="h2">Members</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head" width="90%">
                Username
              </TableCell>
              <TableCell width="10%" />
            </TableRow>
          </TableHead>
          <TableBody>
            {board.members.map((member) => (
              <TableRow key={member.id}>
                <TableCell width="90%">{member.username}</TableCell>
                <TableCell width="10%">
                  <Button
                    color="error"
                    onClick={() => removeBoardMember({ variables: { boardId: board.id, memberId: member.id } })}
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                  />
                </TableCell>
              </TableRow>
            ))}
            {getAllUsersResult.data.users
              .filter((user) => board.members.every((member) => member.id !== user.id))
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell width="90%">{user.username}</TableCell>
                  <TableCell width="10%">
                    <Button
                      color="success"
                      onClick={() => addBoardMember({ variables: { boardId: board.id, userId: user.id } })}
                      size="small"
                      startIcon={<AddIcon />}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
