import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import User from "#types/user"
import Http from "#utils/Http"

interface State {
  isUserLoggedIn: boolean
  userData: User
}

const initialState: State = {
  isUserLoggedIn: Boolean(localStorage.authToken),
  userData: {
    id: 0,
    password: "",
    username: "",
  },
}

const slice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("authToken")
      state.isUserLoggedIn = false
      state.userData = initialState.userData
    },
    setCurrentUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload
    },
    setIsUserLoggedIn: (state, action: PayloadAction<State["isUserLoggedIn"]>) => {
      state.isUserLoggedIn = action.payload
    },
  },
})

type Login = (credentials: { password: User["password"]; username: User["username"] }) => AppThunk
export const login: Login =
  ({ password, username }) =>
  async (dispatch): Promise<void> => {
    const [{ authToken }] = await Http.post<{ authToken: string }>({
      payload: {
        password,
        username,
      },
      url: "/api/login",
    })

    if (!authToken) return

    localStorage.authToken = authToken

    dispatch(setIsUserLoggedIn(true))
    dispatch(getCurrentUserData())
  }

export const getCurrentUserData =
  (): AppThunk =>
  async (dispatch): Promise<void> => {
    try {
      const [data] = await Http.get<User>({ url: "/api/users/0" })
      dispatch(setCurrentUserData(data))
    } catch (error) {
      console.warn(error)
    }
  }

export const { logOut, setCurrentUserData, setIsUserLoggedIn } = slice.actions
export const userReducer = slice.reducer
