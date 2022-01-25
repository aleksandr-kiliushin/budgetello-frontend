import { Store, configureStore } from '@reduxjs/toolkit'

import { commonReducer } from '#models/common'
import { financeReducer } from '#models/finance'
import { RootState } from '#models/store'
import { userReducer } from '#models/user'

type InitializeStore = () => Store<RootState>

const initializeStore: InitializeStore = () =>
  configureStore({
    reducer: {
      common: commonReducer,
      finance: financeReducer,
      user: userReducer,
    },
  })

export default initializeStore
