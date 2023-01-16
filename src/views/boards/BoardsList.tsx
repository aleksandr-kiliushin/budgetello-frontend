import { Breadcrumbs, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"

export const BoardsList: React.FC = () => {
  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  if (!getParticipatedBoardsResult.data) return null
  if (!getNonParticipatedBoardsResult.data) return null

  return (
    <>
      <Breadcrumbs>
        <Link css={{ fontWeight: "bold" }} to="/boards">
          Boards
        </Link>
      </Breadcrumbs>
      <br />
      <Typography variant="h3">Your boards</Typography>
      <ul>
        {getParticipatedBoardsResult.data.boards.length === 0 && "None"}
        {getParticipatedBoardsResult.data.boards.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}/records`}>{board.name}</Link>
          </li>
        ))}
      </ul>
      <Typography variant="h3">Other boards</Typography>
      <ul>
        {getNonParticipatedBoardsResult.data.boards.length === 0 && "None"}
        {getNonParticipatedBoardsResult.data.boards.map((board) => (
          <Link key={board.id} to={`/boards/${board.id}/records`}>
            {board.name}
          </Link>
        ))}
      </ul>
    </>
  )
}
