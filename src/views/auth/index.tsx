import { FC } from "react"

import { useAppSelector } from "#utils/hooks"

import Login from "./Login"
import Logout from "./Logout"

const Auth: FC = () => {
  const user = useAppSelector((state) => state.user)

  if (user.isLoggedIn === undefined) return <p>Loading ...</p>
  if (user.isLoggedIn === false) return <Login />
  if (user.isLoggedIn === true) return <Logout />
  return null
}

export default Auth
