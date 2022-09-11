import { FC } from "react"

import { useAppSelector } from "#utils/hooks"

import Login from "./Login"
import Logout from "./Logout"

const Auth: FC = () => {
  const user = useAppSelector((state) => state.user)

  return user.isLoggedIn ? <Logout /> : <Login />
}

export default Auth
