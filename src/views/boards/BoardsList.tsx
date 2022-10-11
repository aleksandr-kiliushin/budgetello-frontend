import React from "react"
import { Link } from "react-router-dom"

import { IBoard } from "#types/boards"
import { Http } from "#utils/Http"
import { useAppSelector } from "#utils/hooks"

export const BoardsList: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  const [participatedBoards, setParticipatedBoards] = React.useState<IBoard[]>([])
  React.useEffect(() => {
    Http.get({ url: "/api/boards/search?iAmMemberOf=true" })
      .then((response) => response.json())
      .then(setParticipatedBoards)
  }, [])

  const [notParticipatedBoards, setNotParticipatedBoards] = React.useState<IBoard[]>([])
  React.useEffect(() => {
    Http.get({ url: "/api/boards/search?iAmMemberOf=false" })
      .then((response) => response.json())
      .then(setNotParticipatedBoards)
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
