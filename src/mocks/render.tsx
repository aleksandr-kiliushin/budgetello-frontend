import { Store } from "@reduxjs/toolkit"
import "@testing-library/jest-dom"
import { RenderOptions, RenderResult, render as rtlRender } from "@testing-library/react"
import { FC, ReactElement } from "react"
import { Provider } from "react-redux"

import { RootState } from "#models/store"

import initializeStore from "./hooks/initializeStore"
import login from "./hooks/login"

let store: Store<RootState>

beforeEach(async () => {
  store = initializeStore()
  await login(store)
})
afterEach(() => {
  localStorage.clear()
})

const AllTheProviders: FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>
}

const render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">): RenderResult =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options })

export default render
