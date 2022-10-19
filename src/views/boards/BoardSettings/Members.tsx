import { gql } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"

import { IUser } from "#types/IUser"
import { IBoard } from "#types/boards"
import { apolloClient } from "#utils/apolloClient"
import { IBoardsRouteParams } from "#views/boards/types"

export const Members: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()
  const [board, setBoard] = React.useState<IBoard | undefined>(undefined)
  React.useEffect(() => {
    if (params.boardId === undefined) return
    apolloClient
      .query({
        query: gql`
          query GET_BOARD {
            board(id: ${params.boardId}) {
              members {
                id
                username
              }
            }
          }
        `,
      })
      .then((response) => setBoard(response.data.board))
  }, [params.boardId])

  const [allUsers, setAllUsers] = React.useState<IUser[]>([])
  React.useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query GET_USERS {
            users {
              id
              username
            }
          }
        `,
      })
      .then((response) => setAllUsers(response.data.users))
  }, [])

  if (board === undefined) return null

  const addUserToBoard = async ({ userId }: { userId: IUser["id"] }) => {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation ADD_BOARD_MEMBER {
          addBoardMember(input: { boardId: ${params.boardId}, userId: ${userId} }) {
            id
            username
          }
        }
      `,
    })
    setBoard(response.data.addBoardMember)
  }

  const removeMemberFromBoard = async ({ userId }: { userId: IUser["id"] }) => {
    const response = await apolloClient.mutate({
      mutation: gql`
        mutation REMOVE_BOARD_MEMBER {
          removeBoardMember(input: { boardId: ${params.boardId}, memberId: ${userId} }) {
            id
            username
          }
        }
      `,
    })
    setBoard(response.data.removeBoardMember)
  }

  return (
    <>
      <h2>Users</h2>
      {board.members.map((member) => (
        <div key={member.id}>
          <span>{member.username}</span>
          <button onClick={() => removeMemberFromBoard({ userId: member.id })}>- Remove from board</button>
        </div>
      ))}
      {allUsers
        .filter((user) => board.members.every((member) => member.id !== user.id))
        .map((user) => (
          <p key={user.id}>
            <span>{user.username}</span>
            <button onClick={() => addUserToBoard({ userId: user.id })}>+ Add to board</button>
          </p>
        ))}
    </>
  )
}
