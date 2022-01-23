/** @jest-environment jsdom */
// TODO: Check if it works without @jest-... comment.
import { act, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { correctAuthToken, userData } from '#mocks/constants'
import render from '#mocks/render'
import Auth from '#views/auth'

test('<Auth />', async () => {
  render(<Auth />)

  let welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
  let logInButton = screen.getByRole('button', { name: 'Log in' })

  expect(localStorage.authToken).toBeUndefined()
  expect(welcomeHeading).toBeInTheDocument()
  expect(logInButton).toBeInTheDocument()
  expect(logInButton).toBeDisabled()

  await act(async () => {
    userEvent.type(await screen.findByLabelText('Username'), 'john_doe')
    userEvent.type(await screen.findByLabelText('Password'), 's3cret')
  })

  expect(logInButton).toBeEnabled()

  fireEvent.click(logInButton)

  await waitFor(() => {
    expect(welcomeHeading).not.toBeInTheDocument()
  })

  expect(localStorage.authToken).toBe(correctAuthToken)
  expect(logInButton).not.toBeInTheDocument()

  const logOutButton = screen.getByRole('button', { name: 'Log out' })
  expect(logOutButton).toBeInTheDocument()

  await waitFor(() => {
    const youAreLoggedInParagraph = screen.getByText(
      (content, node) => node?.textContent === `You are logged in as ${userData.username}.`,
    )

    expect(youAreLoggedInParagraph).toBeInTheDocument()
  })

  await act(async () => {
    await userEvent.click(logOutButton)
  })

  expect(logOutButton).not.toBeInTheDocument()

  welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
  logInButton = screen.getByRole('button', { name: 'Log in' })

  expect(welcomeHeading).toBeInTheDocument()
  expect(logInButton).toBeInTheDocument()
  expect(localStorage.authToken).toBeUndefined()
})
