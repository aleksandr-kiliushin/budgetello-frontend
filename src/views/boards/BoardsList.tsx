import React from "react"
import { Link } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"
import { useAppSelector } from "#utils/hooks"

export const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  if (getParticipatedBoardsResult.data === undefined) return null
  if (getNonParticipatedBoardsResult.data === undefined) return null

  return (
    <>
      <h2>Your boards</h2>
      {getParticipatedBoardsResult.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
      <h2>Other boards</h2>
      {getNonParticipatedBoardsResult.data.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
    </>
  )
}
