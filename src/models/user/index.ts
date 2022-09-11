import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import { IUser } from "#types/IUser"
import Http from "#utils/Http"

interface IState {
  isLoggedIn: boolean
  data: IUser
}

const initialState: IState = {
  isLoggedIn: false,
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
    const [{ authToken }] = await Http.post<{ authToken: string }>({
      payload: { password, username },
      url: "/api/login",
    })

    if (authToken === undefined) return
    localStorage.authToken = authToken

    dispatch(userActions.setIsUserLoggedIn(true))
    dispatch(getCurrentUserData())
  }
}

export const getCurrentUserData = (): AppThunk => {
  return async (dispatch): Promise<void> => {
    const [data, response] = await Http.get<IUser>({ url: "/api/users/0" })
    if (response.status === 401) {
      return
    }
    dispatch(userActions.setCurrentUser(data))
  }
}
