import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '#interfaces/user'
import { setRedirectPath } from '#models/common'
import { AppThunk } from '#models/store'
import Http from '#utils/Http'

const initialState: State = {
  isUserLoggedIn: !!localStorage.authToken,
  userData: {
    id: 0,
    username: '',
  },
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem('authToken')
      state.isUserLoggedIn = false
      state.userData = initialState.userData
    },
    setIsUserLoggedIn: (state, action: PayloadAction<State['isUserLoggedIn']>) => {
      state.isUserLoggedIn = action.payload
    },
    setCurrentUserData: (state, action: PayloadAction<State['userData']>) => {
      state.userData = action.payload
    },
  },
})

export const { logOut, setCurrentUserData, setIsUserLoggedIn } = slice.actions
export const userReducer = slice.reducer

export const getCurrentUserData = (): AppThunk => async (dispatch) => {
  const currentUserData = await Http.get({ url: 'api/user/me' })
  delete currentUserData.password
  dispatch(setCurrentUserData(currentUserData))
}

export const logIn =
  ({ password, username }: Pick<IUser, 'password' | 'username'>): AppThunk =>
  async (dispatch) => {
    const { authToken } = await Http.post({
      payload: {
        password,
        username,
      },
      url: 'api/login',
    })

    if (!authToken) return

    localStorage.authToken = authToken

    dispatch(setIsUserLoggedIn(true))

    dispatch(getCurrentUserData())

    dispatch(setRedirectPath('/'))
  }

interface State {
  isUserLoggedIn: boolean
  userData: Pick<IUser, 'id' | 'username'>
}
