import { FC } from 'react'

import { useAppSelector } from '#utils/hooks'

import Login from './Login'
import Logout from './Logout'

const Auth: FC = () => {
  const { isUserLoggedIn } = useAppSelector((state) => state.user)

  return isUserLoggedIn ? <Logout /> : <Login />
}

export default Auth
