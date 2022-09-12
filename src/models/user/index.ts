import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import { IUser } from "#types/IUser"
import Http from "#utils/Http"

interface IState {
  isAuthorized: boolean | undefined
  data: IUser
}

const initialState: IState = {
  isAuthorized: undefined,
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
      state.isAuthorized = false
      state.data = initialState.data
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.data = action.payload
    },

    setIsUserAuthorized: (state, action: PayloadAction<IState["isAuthorized"]>) => {
      state.isAuthorized = action.payload
    },
  },
})

export const userActions = userSlice.actions
export const userReducer = userSlice.reducer

export const fetchAndSetAuthorizedUser = (): AppThunk<Promise<boolean>> => {
  return async (dispatch, getState) => {
    if (getState().user.isAuthorized === false) return false
    try {
      const response = await Http.get({ url: "/api/users/0" })
      dispatch(userActions.setCurrentUser(await response.json()))
      return true
    } catch (error) {
      return false
    }
  }
}

type Login = (credentials: { password: IUser["password"]; username: IUser["username"] }) => AppThunk<Promise<void>>
export const login: Login = ({ password, username }) => {
  return async (dispatch): Promise<void> => {
    localStorage.removeItem("authToken")
    const response = await Http.post({
      payload: { password, username },
      url: "/api/login",
    })
    const { authToken } = await response.json()
    if (authToken === undefined) {
      dispatch(userActions.setIsUserAuthorized(false))
      return
    }
    localStorage.authToken = authToken
    dispatch(userActions.setIsUserAuthorized(true))
    await dispatch(fetchAndSetAuthorizedUser())
  }
}
