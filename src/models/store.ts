import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'

import { commonReducer } from './common'
import { financeReducer } from './finance'
import { userReducer } from './user'

const store = configureStore({
  reducer: {
    common: commonReducer,
    finance: financeReducer,
    user: userReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default store
