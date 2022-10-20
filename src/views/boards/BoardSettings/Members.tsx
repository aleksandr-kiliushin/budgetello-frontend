import { gql } from "@apollo/client"
import React from "react"
import { useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { useGetUsersQuery } from "#api/users"
import { IUser } from "#types/IUser"
import { apolloClient } from "#utils/apolloClient"
import { IBoardsRouteParams } from "#views/boards/types"

export const Members: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()

  const getBoardResponse = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  if (getBoardResponse.data === undefined) return null
  const board = getBoardResponse.data.board

  const queryAllUsersResponse = useGetUsersQuery()
  if (queryAllUsersResponse.data === undefined) return null
  const allUsers = queryAllUsersResponse.data.users

  if (board === undefined) return null

  const addUserToBoard = async ({ userId }: { userId: IUser["id"] }) => {
    await apolloClient.mutate({
      mutation: gql`
        mutation ADD_BOARD_MEMBER {
          addBoardMember(input: { boardId: ${params.boardId}, userId: ${userId} }) {
            admins {
              id
              username
            }
            id
            members {
              id
              username
            }
            name
            subject {
              id
              name
            }
          }
        }
      `,
    })
  }

  const removeMemberFromBoard = async ({ userId }: { userId: IUser["id"] }) => {
    await apolloClient.mutate({
      mutation: gql`
        mutation REMOVE_BOARD_MEMBER {
          removeBoardMember(input: { boardId: ${params.boardId}, memberId: ${userId} }) {
            admins {
              id
              username
            }
            id
            members {
              id
              username
            }
            name
            subject {
              id
              name
            }
          }
        }
      `,
    })
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
