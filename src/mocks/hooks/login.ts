import { Store } from "@reduxjs/toolkit"

import authConstants from "#mocks/constants/auth"
import { AppDispatch, RootState } from "#models/store"
import { login as loginThunkCreator } from "#models/user"

type Login = (store: Store<RootState>) => Promise<void>

const login: Login = async (store) => {
  const dispatch: AppDispatch = store.dispatch
  await dispatch(
    loginThunkCreator({
      password: authConstants.validUsername,
      username: authConstants.validPassword,
    })
  )
}

export default login
