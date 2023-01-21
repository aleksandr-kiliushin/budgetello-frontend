import { Add as AddIcon } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import React from "react"
import { Link, useLocation } from "react-router-dom"

import { useGetBoardsQuery } from "#api/boards"

import { CreateBoardFormDialog } from "./CreateBoardFormDialog"

export const BoardsList: React.FC = () => {
  const location = useLocation()

  const getParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: true } })
  const getNonParticipatedBoardsResult = useGetBoardsQuery({ variables: { iAmMemberOf: false } })

  const participatedBoards = getParticipatedBoardsResult.data?.boards
  const nonParticipatedBoards = getNonParticipatedBoardsResult.data?.boards

  return (
    <>
      <Typography variant="h3">Your boards</Typography>
      <Button component={Link} startIcon={<AddIcon />} to="/boards/create" variant="outlined" />
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
      {location.pathname.endsWith("/create") && <CreateBoardFormDialog />}
    </>
  )
}
