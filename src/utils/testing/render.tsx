import { ApolloProvider } from "@apollo/client"
import { render as rtlRender } from "@testing-library/react"
import { createBrowserHistory } from "history"
import React from "react"
import { Provider } from "react-redux"
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"

import { CreateAuthorizationTokenDocument } from "#api/authorization"
import { initializeStore } from "#models/store"
import { fetchAndSetAuthorizedUser, userActions } from "#models/user"
import { apolloClient } from "#utils/apolloClient"

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
    localStorage.removeItem("authToken")
    const response = await apolloClient.mutate({
      mutation: CreateAuthorizationTokenDocument,
      variables: { username: credentialsByTestUserId[iAm].username, password: credentialsByTestUserId[iAm].password },
    })
    const authorizationToken = response.data.createAuthorizationToken
    if (typeof authorizationToken !== "string") {
      throw new Error(`Authorization failed for the following credentials:
Username: "${credentialsByTestUserId[iAm].username}", password: "${credentialsByTestUserId[iAm].password}".
`)
    }
    localStorage.authToken = authorizationToken
    store.dispatch(userActions.setIsUserAuthorized(true))
    await store.dispatch(fetchAndSetAuthorizedUser())
  }

  const AllTheProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
      <HistoryRouter history={history}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>{children}</Provider>
        </ApolloProvider>
      </HistoryRouter>
    )
  }

  return {
    ...rtlRender(component, { wrapper: AllTheProviders, ...restOptions }),
    history,
    store,
  }
}
