import React from "react"
import { useParams } from "react-router-dom"

import { IUser } from "#types/IUser"
import { IBoard } from "#types/boards"
import { Http } from "#utils/Http"
import { IBoardsRouteParams } from "#views/boards/types"

export const Members: React.FC = () => {
  const params = useParams<IBoardsRouteParams>()
  const [board, setBoard] = React.useState<IBoard | undefined>(undefined)
  React.useEffect(() => {
    if (params.boardId === undefined) return
    Http.get({ url: "/api/boards/" + params.boardId })
      .then((response) => response.json())
      .then(setBoard)
  }, [params.boardId])

  const [allUsers, setAllUsers] = React.useState<IUser[]>([])
  React.useEffect(() => {
    Http.get({ url: "/api/users/search" })
      .then((response) => response.json())
      .then(setAllUsers)
  }, [])

  if (board === undefined) return null

  const addUserToBoard = async ({ userId }: { userId: IUser["id"] }) => {
    const updatedBoardResponse = await Http.post({
      payload: {},
      url: `/api/boards/${params.boardId}/add-member/${userId}`,
    })
    setBoard(await updatedBoardResponse.json())
  }

  return (
    <>
      <h2>Users</h2>
      {board.members.map((member) => (
        <p key={member.id}>{member.username}</p>
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
