import { waitFor } from "@testing-library/react"

import { render } from "#utils/testing/render"
import { wait } from "#utils/wait"

import App from "./index"

describe("<App />", () => {
  test("If user is not authorized, redirect to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "guest", initialUrl: "/settings" })
    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })

  test("If user is authorized they is NOT redirected to /auth.", async () => {
    const { history } = await render(<App />, { iAm: "john-doe", initialUrl: "/settings" })

    await wait(1000)
    expect(history.location.pathname).toEqual("/settings")
  })
})
