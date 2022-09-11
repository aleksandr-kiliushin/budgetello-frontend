import { waitFor } from "@testing-library/react"

// import { wait } from "@testing-library/user-event/dist/utils"
// import { login } from "#models/user"
import { render } from "#utils/testing/render"

import App from "./index"

describe("<App />", () => {
  test("If user is not authorized, redirect to /auth.", async () => {
    const { history } = render(<App />, { initialUrl: "/settings" })
    await waitFor(() => expect(history.location.pathname).toEqual("/auth"))
  })

  // test.skip("If user is authorized they is NOT redirected to /auth.", async () => {
  //   const { history, store } = render(<App />, { initialUrl: "/settings" })
  //   store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))
  //   await wait(1500)
  //   expect(history.location.pathname).toEqual("/settings")
  // })
})
