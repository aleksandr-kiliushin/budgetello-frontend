import '@testing-library/jest-dom'
import { RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import store from '#models/store'

const AllTheProviders: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

const render = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options })

export default render
