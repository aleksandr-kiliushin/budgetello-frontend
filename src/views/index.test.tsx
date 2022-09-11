import { waitFor } from "@testing-library/react"

import { render } from "#utils/testing/render"

import App from "./index"

describe("<App />", () => {
  test("If user is not authorized, redirect to /auth.", async () => {
    const { history } = render(<App />, { initialUrl: "/settings" })
    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })
})
