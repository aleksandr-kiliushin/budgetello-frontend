import { FC } from "react"

import { useGetUserQuery } from "#api/users/index.generated"

import { Login } from "./Login"
import { Logout } from "./Logout"

export const Auth: FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (getAuthorizedUserResult.loading) return null
  if (getAuthorizedUserResult.error) return <Login />
  return <Logout />
}
