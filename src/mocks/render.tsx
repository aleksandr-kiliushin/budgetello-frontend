import { Store, configureStore } from '@reduxjs/toolkit'
import '@testing-library/jest-dom'
import { RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import { commonReducer } from '#models/common'
import { financeReducer } from '#models/finance'
import { userReducer } from '#models/user'

let store: Store

beforeEach(() => {
  store = configureStore({
    reducer: {
      common: commonReducer,
      finance: financeReducer,
      user: userReducer,
    },
  })

  localStorage.clear()
})

const AllTheProviders: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options })

export default render
