import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { render } from "#utils/testing/render"

import { Auth } from "./index"

describe("Auth service.", () => {
  test("Login works correctly.", async () => {
    await render(<Auth />, { iAm: "guest" })

    expect(localStorage.authToken).toBeUndefined()
    expect(screen.getByText("Welcome")).toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeDisabled()
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "john-doe-password"))
    expect(screen.getByText("Log in")).toBeEnabled()
    await waitFor(() => userEvent.click(screen.getByText("Log in")))
    await waitForElementToBeRemoved(() => screen.getByText("Welcome"))
    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))
    expect(screen.queryByText("Log in")).not.toBeInTheDocument()
    expect(screen.getByText("Log out")).toBeInTheDocument()
    await waitFor(() => {
      expect(screen.getByText(/You are logged in/)).toHaveTextContent("You are logged in as john-doe.")
    })
  })

  test("Case: User enters unexisting username.", async () => {
    await render(<Auth />, { iAm: "guest" })

    expect(localStorage.authToken).toBeUndefined()
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe-INCORRECT-USERNAME"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "john-doe-password"))
    await waitFor(() => userEvent.click(screen.getByText("Log in")))
    await waitFor(() => expect(screen.getByText("User not found.")).toBeInTheDocument())

    userEvent.clear(screen.getByLabelText("Username"))
    await waitFor(() => expect(screen.queryByText("User not found.")).not.toBeInTheDocument())
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe"))
    await waitFor(() => userEvent.click(screen.getByText("Log in")))
    await waitFor(() => {
      expect(screen.getByText(/You are logged in/)).toHaveTextContent("You are logged in as john-doe.")
    })
  })

  test("Case: User enters unexisting username.", async () => {
    await render(<Auth />, { iAm: "guest" })

    expect(localStorage.authToken).toBeUndefined()
    await waitFor(() => userEvent.type(screen.getByLabelText("Username"), "john-doe"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "john-doe-INVALID-password"))
    userEvent.click(screen.getByText("Log in"))
    await waitFor(() => expect(screen.getByText("Invalid password.")).toBeInTheDocument())

    userEvent.clear(screen.getByLabelText("Password"))
    await waitFor(() => expect(screen.queryByText("Invalid password.")).not.toBeInTheDocument())
    await waitFor(() => userEvent.type(screen.getByLabelText("Password"), "john-doe-password"))
    await waitFor(() => userEvent.click(screen.getByText("Log in")))
    await waitFor(() => {
      expect(screen.getByText(/You are logged in/)).toHaveTextContent("You are logged in as john-doe.")
    })
  })

  test("Logout works correctly.", async () => {
    await render(<Auth />, { iAm: "john-doe" })

    expect(localStorage.authToken).toEqual(expect.stringMatching(".+"))
    userEvent.click(screen.getByText("Log out"))
    await waitFor(() => expect(localStorage.authToken).toBeUndefined())
    expect(screen.queryByText("Log out")).not.toBeInTheDocument()
    expect(screen.getByText("Log in")).toBeInTheDocument()
  })
})
