import React from "react"
import { Link } from "react-router-dom"

import { useGetBoardsQuery } from "#api/index"
import { useAppSelector } from "#utils/hooks"

export const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  const getParticipatedBoardsResponse = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResponse = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  if (getParticipatedBoardsResponse.data === undefined) return null
  if (getNonParticipatedBoardsResponse.data === undefined) return null

  return (
    <>
      <h2>Your boards</h2>
      {getParticipatedBoardsResponse.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
      <h2>Other boards</h2>
      {getNonParticipatedBoardsResponse.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
    </>
  )
}
