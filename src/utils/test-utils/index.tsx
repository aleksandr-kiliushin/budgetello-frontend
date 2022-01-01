import '@testing-library/jest-dom'
import { RenderOptions, render } from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'
import { FC, ReactElement } from 'react'
import { Provider } from 'react-redux'

import store from '#models/store'

const AllTheProviders: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

fetchMock.enableMocks()

export * from '@testing-library/react'
export { customRender as render }
