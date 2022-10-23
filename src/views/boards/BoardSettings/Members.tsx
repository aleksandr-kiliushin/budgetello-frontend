import React from "react"
import { useParams } from "react-router-dom"

import { useAddBoardMemberMutation, useGetBoardQuery, useRemoveBoardMemberMutation } from "#api/boards"
import { useGetUsersQuery } from "#api/users"
import { IBoardsRouteParams } from "#views/boards/types"

export const Members: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()

  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })
  if (getBoardResult.data === undefined) return null
  const board = getBoardResult.data.board

  const [addBoardMember] = useAddBoardMemberMutation()
  const [removeBoardMember] = useRemoveBoardMemberMutation()

  const getAllUsersResult = useGetUsersQuery()
  if (getAllUsersResult.data === undefined) return null
  const allUsers = getAllUsersResult.data.users

  if (board === undefined) return null

  return (
    <>
      <h2>Users</h2>
      {board.members.map((member) => (
        <div key={member.id}>
          <span>{member.username}</span>
          <button onClick={() => removeBoardMember({ variables: { boardId: board.id, memberId: member.id } })}>
            - Remove from board
          </button>
        </div>
      ))}
      {allUsers
        .filter((user) => board.members.every((member) => member.id !== user.id))
        .map((user) => (
          <p key={user.id}>
            <span>{user.username}</span>
            <button onClick={() => addBoardMember({ variables: { boardId: board.id, userId: user.id } })}>
              + Add to board
            </button>
          </p>
        ))}
    </>
  )
}
