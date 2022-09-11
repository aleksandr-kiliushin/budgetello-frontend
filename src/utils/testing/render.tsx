import { render as rtlRender } from "@testing-library/react"
import { createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { initializeStore } from "#models/store"

import { IRender } from "./types"

export const render: IRender = (component, options) => {
  const store = initializeStore()
  const history = createBrowserHistory()
  history.push(options?.initialUrl ?? "/")

  const AllTheProviders: React.FC = ({ children }) => {
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
