import { render as rtlRender } from "@testing-library/react"
import { createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { initializeStore } from "#models/store"
import { login, userActions } from "#models/user"

import { credentialsByTestUserId } from "./test-users"
import { IRender } from "./types"

export const render: IRender = async (component, options) => {
  const { iAm, initialUrl, ...restOptions } = options

  const store = initializeStore()
  const history = createBrowserHistory()
  history.push(initialUrl ?? "/")

  if (iAm === "guest") {
    store.dispatch(userActions.setIsUserAuthorized(false))
  }
  if (typeof iAm === "number" && iAm in credentialsByTestUserId) {
    await store.dispatch(
      login({ username: credentialsByTestUserId[iAm].username, password: credentialsByTestUserId[iAm].password })
    )
  }

  const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
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
