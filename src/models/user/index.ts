import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import { LoadingStatus } from "#src/constants/shared"
import { IUser } from "#types/IUser"
import Http from "#utils/Http"

interface IState {
  isUserLoggedIn: boolean
  user: {
    data: IUser
    status: LoadingStatus
  }
}

const initialState: IState = {
  isUserLoggedIn: false,
  user: {
    data: {
      id: 0,
      password: "",
      username: "",
    },
    status: LoadingStatus.Idle,
  },
}

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("authToken")
      state.isUserLoggedIn = false
      state.user = initialState.user
    },
    setCurrentUser: (state, action: PayloadAction<IUser>) => {
      state.user.data = action.payload
    },
    setCurrentUserStatus: (state, action: PayloadAction<LoadingStatus>) => {
      state.user.status = action.payload
    },
    setIsUserLoggedIn: (state, action: PayloadAction<IState["isUserLoggedIn"]>) => {
      state.isUserLoggedIn = action.payload
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
      dispatch(userActions.setCurrentUserStatus(LoadingStatus.Error))
      return
    }
    dispatch(userActions.setCurrentUser(data))
    dispatch(userActions.setCurrentUserStatus(LoadingStatus.Success))
  }
}
