import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { render } from "#utils/testing/render"

import Auth from "./index"

describe("Auth service.", () => {
  test("Login works correctly.", async () => {
    render(<Auth />, { iAm: "guest" })

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

  test("Appropriate errors are displayed after invalid input.", async () => {
    render(<Auth />, { iAm: "guest" })

    expect(localStorage.authToken).toBeUndefined()
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "nonexistent-username"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "some-password"))
    userEvent.click(screen.getByText("Log in"))
    await waitFor(() => expect(screen.getByText("User not found.")).toBeInTheDocument())

    userEvent.clear(screen.getByLabelText("Username"))
    await waitFor(() => expect(screen.queryByText("User not found.")).not.toBeInTheDocument())
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe"))
    await waitFor(() => userEvent.click(screen.getByText("Log in")))
    await waitFor(() => expect(screen.getByText("Invalid password.")).toBeInTheDocument())
  })

  test("Logout works correctly.", async () => {
    await render(<Auth />, { iAm: "john-doe" })

    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))
    userEvent.click(screen.getByText("Log out"))
    expect(localStorage.authToken).toBeUndefined()
    expect(screen.queryByText("Log out")).not.toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })
})
