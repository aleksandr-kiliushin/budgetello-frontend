import { waitFor } from "@testing-library/react"

import { render } from "#utils/testing/render"
import { wait } from "#utils/wait"

import App from "./index"

describe("<App />", () => {
  test("If the user is not authorized, redirect to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "guest", initialUrl: "/settings" })
    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })

  test("If the user is authorized they is NOT redirected to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "john-doe", initialUrl: "/settings" })

    await wait(1000)
    expect(history.location.pathname).toEqual("/settings")
  })

  test("If the user has authToken in localStorage, they is not redirecte to /auth.", async () => {
    const authorizationResponse = await fetch("http://localhost:3080/api/login", {
      body: JSON.stringify({ username: "john-doe", password: "john-doe-password" }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
    const { authToken } = await authorizationResponse.json()
    if (typeof authToken !== "string") {
      throw new Error(`Authorization failed for the following credentials:
Username: "john-doe", password: "john-doe-password".`)
    }
    localStorage.authToken = authToken

    const { history } = await render(<App />, { iAm: "guest", initialUrl: "/settings" })

    await wait(1000)
    expect(history.location.pathname).toEqual("/settings")
  })
})
