import { waitFor } from "@testing-library/react"

import { getAuthToken } from "#utils/testing/getAuthToken"
import { render } from "#utils/testing/render"
import { testUsers } from "#utils/testing/test-users"

import { App } from "./index"

describe("<App />", () => {
  test("If the user is not authorized, redirect to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "guest", initialUrl: "/boards" })

    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })

  test("If an authorized user open some page, they are NOT redirected to /auth..", async () => {
    const { history } = await render(<App />, { iAm: testUsers.jessicaStark.id, initialUrl: "/boards" })

    expect(history.location.pathname).toEqual("/boards")
  })

  test("If the user has authToken in localStorage (i. e. was logged in before and refreshes the page), they is NOT redirected to /auth.", async () => {
    localStorage.authToken = await getAuthToken(testUsers.johnDoe.id)
    const { history } = await render(<App />, { iAm: undefined, initialUrl: "/boards" })

    expect(history.location.pathname).toEqual("/boards")
  })
})
