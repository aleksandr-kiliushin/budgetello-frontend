import { gql } from "@apollo/client"
import React from "react"
import { Link } from "react-router-dom"

import { IBoard } from "#types/boards"
import { apolloClient } from "#utils/apolloClient"
import { useAppSelector } from "#utils/hooks"

export const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  const [participatedBoards, setParticipatedBoards] = React.useState<IBoard[]>([])
  React.useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query GET_BOARDS {
            boards(iAmMemberOf: true) {
              admins {
                id
              }
              id
              name
            }
          }
        `,
      })
      .then((response) => setParticipatedBoards(response.data.boards))
  }, [])

  const [notParticipatedBoards, setNotParticipatedBoards] = React.useState<IBoard[]>([])
  React.useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query GET_BOARDS {
            boards(iAmMemberOf: false) {
              admins {
                id
              }
              id
              name
            }
          }
        `,
      })
      .then((response) => setNotParticipatedBoards(response.data.boards))
  }, [])

  return (
    <>
      <h2>Your boards</h2>
      {participatedBoards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
      <h2>Other boards</h2>
      {notParticipatedBoards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
          {board.admins.some((admin) => admin.id === user.data.id) && "(YOU ARE ADMIN)"}
        </Link>
      ))}
    </>
  )
}
