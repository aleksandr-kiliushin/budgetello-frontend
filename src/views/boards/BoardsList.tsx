import React from "react"
import { Link } from "react-router-dom"

import { IBoard } from "#types/boards"
import { Http } from "#utils/Http"

export const BoardsList: React.FC = () => {
  const [boards, setBoards] = React.useState<IBoard[]>([])
  React.useEffect(() => {
    Http.get({ url: "/api/boards/search" })
      .then((response) => response.json())
      .then(setBoards)
  }, [])

  return (
    <>
      {boards.map((board) => (
        <Link css={{ display: "block" }} key={board.id} to={`/boards/${board.id}/records`}>
          {board.name}
        </Link>
      ))}
    </>
  )
}
