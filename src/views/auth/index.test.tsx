/** @jest-environment jsdom */
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Auth from "#views/auth"

describe("Auth service.", () => {
  test("Login works correctly.", async () => {
    render(<Auth />)

    expect(localStorage.authToken).toBeUndefined()
    expect(screen.getByText("Welcome")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeDisabled()
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "john-doe-password"))
    expect(screen.getByText("Log in")).toBeEnabled()
    userEvent.click(screen.getByText("Log in"))
    await waitForElementToBeRemoved(() => screen.getByText("Welcome"))
    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))
    expect(screen.queryByText("Log in")).not.toBeInTheDocument()
    expect(screen.getByText("Log out")).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText(/You are logged in/)).toHaveTextContent("You are logged in as john-doe.")
    })
  })

  test("Logout works correctly.", async () => {
    const { store } = render(<Auth />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    await waitFor(() => expect(localStorage.authToken).toEqual(expect.stringMatching(".+")))
    userEvent.click(screen.getByText("Log out"))
    expect(localStorage.authToken).toBeUndefined()
    expect(screen.queryByText("Log out")).not.toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })
})
