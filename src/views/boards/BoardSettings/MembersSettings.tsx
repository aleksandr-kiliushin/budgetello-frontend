import { Add as AddIcon, DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material"
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material"
import React, { FC } from "react"
import { useParams } from "react-router-dom"

import { useAddBoardMemberMutation, useGetBoardQuery, useRemoveBoardMemberMutation } from "#api/boards"
import { useGetUsersQuery } from "#api/users"

import { StyledMembersTableContainer } from "./components"

export const MembersSettings: FC = () => {
  const params = useParams<{ boardId: string }>()

  const getUsersResult = useGetUsersQuery()
  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  const [addBoardMember] = useAddBoardMemberMutation()
  const [removeBoardMember] = useRemoveBoardMemberMutation()

  if (getUsersResult.data === undefined) return null
  if (getBoardResult.data === undefined) return null

  const users = getUsersResult.data.users
  const board = getBoardResult.data.board

  return (
    <>
      <Typography gutterBottom variant="h2">
        Members
      </Typography>
      <StyledMembersTableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Username</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  {board.members.some((member) => member.id === user.id) ? (
                    <Button
                      color="error"
                      onClick={() => removeBoardMember({ variables: { boardId: board.id, memberId: user.id } })}
                      size="small"
                      startIcon={<DeleteOutlineIcon />}
                    />
                  ) : (
                    <Button
                      color="success"
                      onClick={() => addBoardMember({ variables: { boardId: board.id, userId: user.id } })}
                      size="small"
                      startIcon={<AddIcon />}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledMembersTableContainer>
    </>
  )
}
