import { render as rtlRender } from "@testing-library/react"
import { createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { initializeStore } from "#models/store"
import { login } from "#models/user"

import { passwordByUsername } from "./test-users-credentials"
import { IRender } from "./types"

export const render: IRender = async (component, options) => {
  const { iAm, initialUrl, ...restOptions } = options

  const store = initializeStore()
  const history = createBrowserHistory()
  history.push(initialUrl ?? "")

  if (iAm !== "guest") {
    await store.dispatch(login({ username: iAm, password: passwordByUsername[iAm] }))
  }

  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <HistoryRouter history={history}>
        <Provider store={store}>{children}</Provider>
      </HistoryRouter>
    )
  }

  return {
    ...rtlRender(component, { wrapper: AllTheProviders, ...restOptions }),
    history,
    store,
  }
}
