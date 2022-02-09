/** @jest-environment jsdom */
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import authConstants from '#mocks/constants/auth'
import userConstants from '#mocks/constants/user'
import render from '#mocks/render'
import Auth from '#views/auth'

describe('Auth service.', () => {
  test('Login works correctly.', async () => {
    render(<Auth />)

    let logOutButton = screen.getByRole('button', { name: 'Log out' })

    userEvent.click(logOutButton)

    expect(localStorage.authToken).toBeUndefined()

    const welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
    expect(welcomeHeading).toBeInTheDocument()

    const logInButton = screen.getByRole('button', { name: 'Log in' })
    expect(logInButton).toBeInTheDocument()
    expect(logInButton).toBeDisabled()

    const usernameInput = screen.getByLabelText('Username')
    const passwordInput = screen.getByLabelText('Password')
    expect(usernameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    userEvent.type(usernameInput, authConstants.validUsername)
    userEvent.type(passwordInput, authConstants.validPassword)

    await waitFor(() => {
      expect(logInButton).toBeEnabled()
    })

    userEvent.click(logInButton)

    await waitFor(() => {
      expect(welcomeHeading).not.toBeInTheDocument()
    })

    expect(localStorage.authToken).toBe(authConstants.validAuthToken)
    expect(logInButton).not.toBeInTheDocument()

    logOutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logOutButton).toBeInTheDocument()

    await waitFor(() => {
      const youAreLoggedInParagraph = screen.getByText(
        (content, node) => node?.textContent === `You are logged in as ${userConstants.username}.`,
      )
      expect(youAreLoggedInParagraph).toBeInTheDocument()
    })
  })

  test('Logout works correctly.', async () => {
    render(<Auth />)

    await waitFor(() => {
      expect(localStorage.authToken).toBe(authConstants.validAuthToken)
    })

    const logOutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logOutButton).toBeInTheDocument()

    await userEvent.click(logOutButton)

    expect(localStorage.authToken).toBeUndefined()

    expect(logOutButton).not.toBeInTheDocument()

    const welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
    expect(welcomeHeading).toBeInTheDocument()

    const logInButton = screen.getByRole('button', { name: 'Log in' })

    expect(logInButton).toBeInTheDocument()
  })
})
