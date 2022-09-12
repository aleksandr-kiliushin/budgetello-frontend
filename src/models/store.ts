import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"

import { commonReducer } from "./common"
import { financeReducer } from "./finance"
import { logoutMiddleware } from "./logoutMiddleware"
import { userReducer } from "./user"

export const initializeStore = () => {
  return configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(logoutMiddleware),
    reducer: {
      common: commonReducer,
      finance: financeReducer,
      user: userReducer,
    },
  })
}

export const store = initializeStore()

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
export type IStore = ReturnType<typeof initializeStore>
