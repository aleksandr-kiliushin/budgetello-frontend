import { render as rtlRender } from "@testing-library/react"
import { BrowserHistory, createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { IStore, initializeStore } from "#models/store"

import { IRender } from "./types"

let history: BrowserHistory
let store: IStore
beforeEach(async () => {
  history = createBrowserHistory()
  store = initializeStore()
})

export const render: IRender = (component, options) => {
  const AllTheProviders: React.FC = ({ children }) => {
    history.push(options?.initialUrl ?? "/")

    return (
      <HistoryRouter history={history}>
        <Provider store={store}>{children}</Provider>
      </HistoryRouter>
    )
  }

  return {
    ...rtlRender(component, { wrapper: AllTheProviders, ...options }),
    history,
    store,
  }
}
