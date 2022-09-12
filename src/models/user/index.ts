import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import { IUser } from "#types/IUser"
import Http from "#utils/Http"

interface IState {
  isLoggedIn: boolean | undefined
  data: IUser
}

const initialState: IState = {
  isLoggedIn: undefined,
  data: {
    id: 0,
    password: "",
    username: "",
  },
}

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("authToken")
      state.isLoggedIn = false
      state.data = initialState.data
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload
    },
    setIsUserLoggedIn: (state, action: PayloadAction<IState["isLoggedIn"]>) => {
      state.isLoggedIn = action.payload
    },
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer

type Login = (credentials: { password: IUser["password"]; username: IUser["username"] }) => AppThunk
export const login: Login = ({ password, username }) => {
  return async (dispatch): Promise<void> => {
    const response = await Http.post({
      payload: { password, username },
      url: "/api/login",
    })
    const { authToken } = await response.json()

    if (authToken === undefined) return
    localStorage.authToken = authToken

    dispatch(userActions.setIsUserLoggedIn(true))
  }
}

// TODO: Rename with fetchAndSetLoggedInUser.
export const fetchAndSetLoggedInUser = (): AppThunk => {
  return async (dispatch, getState): Promise<void> => {
    if (getState().user.isLoggedIn === false) return
    const response = await Http.get({ url: "/api/users/0" })
    if (response.status !== 200) return
    dispatch(userActions.setCurrentUser(await response.json()))
  }
}
