/** @jest-environment jsdom */
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Auth from "#views/auth"

describe("Auth service.", () => {
  test.skip("Login works correctly.", async () => {
    render(<Auth />)
    expect(localStorage.authToken).toBeUndefined()

    const welcomeHeading = screen.getByRole("heading", { name: "Welcome" })

    const logInButton = screen.getByRole("button", { name: "Log in" })
    expect(logInButton).toBeDisabled()

    const usernameInput = screen.getByLabelText("Username")
    const passwordInput = screen.getByLabelText("Password")

    userEvent.type(usernameInput, "john-doe")
    userEvent.type(passwordInput, "john-doe-password")

    await waitFor(() => {
      expect(logInButton).toBeEnabled()
    })

    userEvent.click(logInButton)

    await waitFor(() => {
      expect(welcomeHeading).not.toBeInTheDocument()
    })

    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))
    expect(logInButton).not.toBeInTheDocument()

    expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument()

    await waitFor(() => {
      const youAreLoggedInParagraph = screen.getByText(
        (content, node) => node?.textContent === `You are logged in as john-doe.`
      )
      expect(youAreLoggedInParagraph).toBeInTheDocument()
    })
  })

  test.skip("Logout works correctly.", async () => {
    const { store } = render(<Auth />)

    await store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))

    const logOutButton = screen.getByRole("button", { name: "Log out" })

    await userEvent.click(logOutButton)

    expect(localStorage.authToken).toBeUndefined()

    expect(logOutButton).not.toBeInTheDocument()

    const welcomeHeading = screen.getByRole("heading", { name: "Welcome" })
    expect(welcomeHeading).toBeInTheDocument()

    const logInButton = screen.getByRole("button", { name: "Log in" })

    expect(logInButton).toBeInTheDocument()
  })
})
