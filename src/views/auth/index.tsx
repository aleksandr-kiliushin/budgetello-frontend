import React from "react"

import { useAppSelector } from "#utils/hooks"

import { Login } from "./Login"
import { Logout } from "./Logout"

export const Auth: React.FC = () => {
  const user = useAppSelector((state) => state.user)

  if (user.isAuthorized === undefined) return <p>Loading ...</p>
  if (user.isAuthorized === false) return <Login />
  if (user.isAuthorized === true) return <Logout />
  return null
}
