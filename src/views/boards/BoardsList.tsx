import { Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"
import { useGetUserQuery } from "#api/users"

export const BoardsList: React.FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })
  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  if (!getAuthorizedUserResult.data) return null
  if (!getParticipatedBoardsResult.data) return null
  if (!getNonParticipatedBoardsResult.data) return null

  const authorizedUser = getAuthorizedUserResult.data.user

  return (
    <>
      <Typography variant="h3">Your boards</Typography>
      {getParticipatedBoardsResult.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === authorizedUser.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
      <Typography variant="h3">Other boards</Typography>
      {getNonParticipatedBoardsResult.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === authorizedUser.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
    </>
  )
}
