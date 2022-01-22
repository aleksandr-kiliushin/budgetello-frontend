import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { setRedirectPath } from '#models/common'
import { AppThunk } from '#models/store'
import User from '#types/user'
import Http from '#utils/Http'

const initialState: State = {
  isUserLoggedIn: !!localStorage.authToken,
  userData: {
    id: 0,
    username: '',
  },
}

const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('authToken')
      state.isUserLoggedIn = false
      state.userData = initialState.userData
    },
    setCurrentUserData: (state, action: PayloadAction<State['userData']>) => {
      state.userData = action.payload
    },
    setIsUserLoggedIn: (state, action: PayloadAction<State['isUserLoggedIn']>) => {
      state.isUserLoggedIn = action.payload
    },
  },
})

export const { logOut, setCurrentUserData, setIsUserLoggedIn } = slice.actions
export const userReducer = slice.reducer

export const getCurrentUserData =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    const currentUserData = await Http.get({ url: '/api/user/me' })
    delete currentUserData.password
    dispatch(setCurrentUserData(currentUserData))
  }

export const logIn =
  ({ password, username }: Pick<User, 'password' | 'username'>): AppThunk =>
  async (dispatch): Promise<void> => {
    const { authToken } = await Http.post({
      payload: {
        password,
        username,
      },
      url: '/api/login',
    })

    if (!authToken) return

    localStorage.authToken = authToken

    dispatch(setIsUserLoggedIn(true))

    dispatch(getCurrentUserData())

    dispatch(setRedirectPath('/'))
  }

interface State {
  isUserLoggedIn: boolean
  userData: Pick<User, 'id' | 'username'>
}
