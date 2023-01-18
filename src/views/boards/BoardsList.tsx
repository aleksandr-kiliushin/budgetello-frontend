import { Breadcrumbs, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"

export const BoardsList: React.FC = () => {
  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  const participatedBoards = getParticipatedBoardsResult.data?.boards
  const nonParticipatedBoards = getNonParticipatedBoardsResult.data?.boards

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
        {participatedBoards?.length === 0 && "None"}
        {participatedBoards?.map((board) => (
          <li key={board.id}>
            <Link to={`/boards/${board.id}/records`}>{board.name}</Link>
          </li>
        ))}
      </ul>
      <Typography variant="h3">Other boards</Typography>
      <ul>
        {nonParticipatedBoards?.length === 0 && "None"}
        {nonParticipatedBoards?.map((board) => (
          <li key={board.id}>
            <Link key={board.id} to={`/boards/${board.id}/records`}>
              {board.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
