import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { AppThunk } from '#models/store'
import User from '#types/user'
import Http from '#utils/Http'

const initialState: State = {
  isUserLoggedIn: Boolean(localStorage.authToken),
  userData: {
    id: 0,
    password: '',
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
    setCurrentUserData: (state, action: PayloadAction<User>) => {
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
    const currentUserData = await Http.get<User>({ url: '/api/user/me' })
    dispatch(setCurrentUserData(currentUserData))
  }

interface State {
  isUserLoggedIn: boolean
  userData: User
}
