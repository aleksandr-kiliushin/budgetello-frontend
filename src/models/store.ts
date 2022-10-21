import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"

import { budgetReducer } from "./budget"
import { userReducer } from "./user"

export const initializeStore = () => {
  return configureStore({
    reducer: {
      budget: budgetReducer,
      user: userReducer,
    },
  })
}

export const store = initializeStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type IStore = ReturnType<typeof initializeStore>
