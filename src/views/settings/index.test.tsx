/** @jest-environment jsdom */
import { act, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import render from '#mocks/render'
import Settings from '#views/settings'

describe('Finance categories service.', () => {
  test('Finance categories come from backend and render correctly.', async () => {
    render(<Settings />)

    financeCategories.forEach(async ({ name }) => {
      expect(await screen.findByText(name)).toBeInTheDocument()
    })
  })

  test('Modal for new category modal opens correctly.', async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole('button', { name: '+New' })
    expect(openModalButton).toBeInTheDocument()

    act(() => {
      userEvent.click(openModalButton)
    })

    const modalHeader = screen.getByRole('heading', { name: 'Create category' })
    expect(modalHeader).toBeInTheDocument()

    const nameInput = screen.getByLabelText('Name')
    expect(nameInput).toBeInTheDocument()

    financeCategoryTypes.forEach(async ({ name }) => {
      const radioButton = await screen.findByLabelText(name)
      expect(radioButton).toBeInTheDocument()
    })

    const closeModalButton = screen.getByRole('button', { name: 'Cancel' })
    expect(closeModalButton).toBeInTheDocument()

    const submitFormButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitFormButton).toBeInTheDocument()
  })

  test('Modal for new category creating closes correctly using Cancel button.', async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole('button', { name: '+New' })
    expect(openModalButton).toBeInTheDocument()

    act(() => {
      userEvent.click(openModalButton)
    })

    const modalHeader = screen.getByRole('heading', { name: 'Create category' })
    expect(modalHeader).toBeInTheDocument()

    const closeModalButton = screen.getByRole('button', { name: 'Cancel' })
    act(() => {
      userEvent.click(closeModalButton)
    })
    expect(modalHeader).not.toBeInTheDocument()
  })

  test('Modal for new category creating closes correctly using click on its backdrop.', async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole('button', { name: '+New' })
    expect(openModalButton).toBeInTheDocument()

    act(() => {
      userEvent.click(openModalButton)
    })

    const modalHeader = screen.getByRole('heading', { name: 'Create category' })
    expect(modalHeader).toBeInTheDocument()

    // ToDo: Add tests for closing on backdrop click.
    // const modalBackdrop = await screen.findByRole('presentation')
    // expect(modalBackdrop).toBeInTheDocument()
    // act(() => {
    //   // if (!modalBackdrop) {
    //   //   throw new Error('Modal backdrop was not found.')
    //   // }
    //   userEvent.click(modalBackdrop)
    // })
    // expect(modalHeader).not.toBeInTheDocument()
  })
})
