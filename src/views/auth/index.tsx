import React from "react"

import { useGetUserQuery } from "#api/users"

import { Login } from "./Login"
import { Logout } from "./Logout"

export const Auth: React.FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (getAuthorizedUserResult.loading) return null
  if (getAuthorizedUserResult.error) return <Login />
  return <Logout />
}
