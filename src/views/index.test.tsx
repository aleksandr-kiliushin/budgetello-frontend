import { waitFor } from "@testing-library/react"

import { getAuthToken } from "#utils/getAuthToken"
import { render } from "#utils/testing/render"
import { wait } from "#utils/wait"

import App from "./index"

describe("<App />", () => {
  test("If the user is not authorized, redirect to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "guest", initialUrl: "/settings" })

    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })

  test("If an authorized user open some page, they are NOT redirected to /auth..", async () => {
    const { history } = await render(<App />, { iAm: "john-doe", initialUrl: "/settings" })
    await wait(1000)

    expect(history.location.pathname).toEqual("/settings")
  })

  test("If the user has authToken in localStorage, they is NOT redirected to /auth.", async () => {
    localStorage.authToken = await getAuthToken("john-doe")
    const { history } = await render(<App />, { iAm: undefined, initialUrl: "/settings" })

    await wait(1000)
    expect(history.location.pathname).toEqual("/settings")
  })
})
