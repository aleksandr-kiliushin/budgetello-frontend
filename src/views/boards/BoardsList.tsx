import { gql, useQuery } from "@apollo/client"
import React from "react"
import { Link } from "react-router-dom"

import { IBoard } from "#types/boards"
import { useAppSelector } from "#utils/hooks"

export const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  const { data: participatedBoards } = useQuery<{ boards: IBoard[] }>(gql`
    query getBoards {
      boards(iAmMemberOf: true) {
        admins {
          id
        }
        id
        name
      }
    }
  `)
  const { data: notParticipatedBoards } = useQuery<{ boards: IBoard[] }>(gql`
    query getBoards {
      boards(iAmMemberOf: false) {
        admins {
          id
        }
        id
        name
      }
    }
  `)

  if (participatedBoards === undefined) return null
  if (notParticipatedBoards === undefined) return null

  return (
    <>
      <h2>Your boards</h2>
      {participatedBoards.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
      <h2>Other boards</h2>
      {notParticipatedBoards.boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
    </>
  )
}
