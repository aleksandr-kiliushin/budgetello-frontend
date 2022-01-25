/** @jest-environment jsdom */
import { act, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { correctAuthToken, userData } from '#mocks/constants'
import render from '#mocks/render'
import Auth from '#views/auth'

describe('Auth service.', () => {
  test('Login works correctly.', async () => {
    render(<Auth />)

    let logOutButton = screen.getByRole('button', { name: 'Log out' })

    act(() => {
      userEvent.click(logOutButton)
    })

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

    act(() => {
      userEvent.type(usernameInput, 'john_doe')
      userEvent.type(passwordInput, 's3cret')
    })

    await waitFor(() => {
      expect(logInButton).toBeEnabled()
    })

    act(() => {
      userEvent.click(logInButton)
    })

    await waitFor(() => {
      expect(welcomeHeading).not.toBeInTheDocument()
    })

    expect(localStorage.authToken).toBe(correctAuthToken)
    expect(logInButton).not.toBeInTheDocument()

    logOutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logOutButton).toBeInTheDocument()

    await waitFor(() => {
      const youAreLoggedInParagraph = screen.getByText(
        (content, node) => node?.textContent === `You are logged in as ${userData.username}.`,
      )
      expect(youAreLoggedInParagraph).toBeInTheDocument()
    })
  })

  test('Logout works correctly.', async () => {
    render(<Auth />)

    await waitFor(() => {
      expect(localStorage.authToken).toBe(correctAuthToken)
    })

    const logOutButton = screen.getByRole('button', { name: 'Log out' })
    expect(logOutButton).toBeInTheDocument()

    act(() => {
      userEvent.click(logOutButton)
    })

    expect(localStorage.authToken).toBeUndefined()

    expect(logOutButton).not.toBeInTheDocument()

    const welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
    expect(welcomeHeading).toBeInTheDocument()

    const logInButton = screen.getByRole('button', { name: 'Log in' })

    expect(logInButton).toBeInTheDocument()
  })
})
