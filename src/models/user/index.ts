import { gql } from "@apollo/client"
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { AppThunk } from "#models/store"
import { IUser } from "#types/IUser"
import { apolloClient } from "#utils/apolloClient"

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
      const response = await apolloClient.query({
        query: gql`
          query GET_USER {
            user(id: 0) {
              id
              username
            }
          }
        `,
      })
      dispatch(userActions.setCurrentUser(response.data.user))
      return true
    } catch (error) {
      return false
    }
  }
}
