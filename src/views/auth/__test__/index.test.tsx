/** @jest-environment jsdom */
// TODO: Check if it works without @jest-... comment.
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// import { correctAuthToken, userData } from '#mocks/constants'
import render from '#mocks/render'
import Auth from '#views/auth'

test('<Auth />', async () => {
  render(<Auth />)

  const welcomeHeading = screen.getByRole('heading', { name: 'Welcome' })
  const logInButton = screen.getByRole('button', { name: 'Log in' })

  expect(localStorage.authToken).toBeUndefined()
  expect(welcomeHeading).toBeInTheDocument()
  expect(logInButton).toBeInTheDocument()
  expect(logInButton).toBeDisabled()

  await act(async () => {
    userEvent.type(await screen.findByLabelText('Username'), 'john_doe')
    userEvent.type(await screen.findByLabelText('Password'), 's3cret')
  })

  expect(logInButton).toBeEnabled()

  await act(async () => {
    await userEvent.click(logInButton)
  })

  // expect(welcomeHeading).not.toBeInTheDocument()
  // expect(localStorage.authToken).toBe(correctAuthToken)
  // expect(logInButton).not.toBeInTheDocument()

  // const logOutButton = screen.getByRole('button', { name: 'Log out' })
  // const youAreLoggedInParagraph = screen.getByText(
  //   (_, node) => node?.textContent === `You are logged in as ${userData.username}.`,
  // )

  // expect(logOutButton).toBeInTheDocument()
  // expect(youAreLoggedInParagraph).toBeInTheDocument()

  // await act(async () => {
  //   await userEvent.click(logOutButton)
  // })

  // expect(logOutButton).not.toBeInTheDocument()

  // welcomeHeader = screen.getByRole('heading', { name: 'Welcome' })
  // logInButton = screen.getByRole('button', { name: 'Log in' })

  // expect(welcomeHeader).toBeInTheDocument()
  // expect(logInButton).toBeInTheDocument()
  // expect(localStorage.authToken).toBeUndefined()
})
