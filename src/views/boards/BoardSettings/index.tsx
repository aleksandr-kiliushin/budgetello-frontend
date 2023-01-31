import { FC } from "react"
import { Navigate, useParams } from "react-router-dom"

import { useGetBoardQuery } from "#api/boards"
import { useGetUserQuery } from "#api/users"

import { BudgetCategoriesSettings } from "./BudgetCategoriesSettings"
import { GeneralSettings } from "./GeneralSettings"
import { MembersSettings } from "./MembersSettings"

export const BoardSettings: FC = () => {
  const params = useParams<{ boardId: string }>()

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })
  const getBoardResult = useGetBoardQuery({ variables: { id: Number(params.boardId) } })

  if (getAuthorizedUserResult.data === undefined) return null
  if (getBoardResult.data === undefined) return null

  const authorizedUser = getAuthorizedUserResult.data.user
  const boardAdmins = getBoardResult.data.board.admins

  if (boardAdmins.every((admin) => admin.id !== authorizedUser.id)) {
    return <Navigate replace to={`/boards/${params.boardId}/records`} />
  }

  return (
    <>
      <GeneralSettings />
      <br />
      <MembersSettings />
      <br />
      <BudgetCategoriesSettings />
    </>
  )
}
