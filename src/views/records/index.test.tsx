import { waitFor } from "@testing-library/react"

import { render } from "#utils/testing/render"

import Records from "./index"

beforeEach(() => {
  console.log("window.IntersectionObserver >>", window.IntersectionObserver)
  window.IntersectionObserver = jest.fn().mockImplementation(() => ({
    observe: () => null,
  }))
})
afterEach(() => {
  ;(window.IntersectionObserver as jest.Mock).mockRestore()
})

describe("<App />", () => {
  test("If the user is not authorized, redirect to /auth.", async () => {
    const { history } = await render(<Records />, { iAm: "john-doe", initialUrl: "/records" })
    await waitFor(() => expect(history.location.pathname).toEqual("/records"))
  })
})
