/** @jest-environment jsdom */
import { act, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'

import { CategoryType, financeCategories, financeCategoryTypes } from '#mocks/constants/finance'
import render from '#mocks/render'
import textContentMatcher from '#utils/testing/textContentMatch'
import Settings from '#views/settings'

describe('Finance categories service.', () => {
  test('Finance categories come from backend and render correctly.', async () => {
    render(<Settings />)

    expect(await screen.findByRole('cell', { name: financeCategories[0].name })).toBeInTheDocument()
    expect(await screen.findByRole('cell', { name: financeCategories[1].name })).toBeInTheDocument()
    expect(await screen.findByRole('cell', { name: financeCategories[4].name })).toBeInTheDocument()
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

  test('A new category is created correctly.', async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole('button', { name: '+New' })
    expect(openModalButton).toBeInTheDocument()

    act(() => {
      userEvent.click(openModalButton)
    })

    const submitCreatingButton = screen.getByRole('button', { name: 'Submit' })
    expect(submitCreatingButton).toBeInTheDocument()
    expect(submitCreatingButton).toBeDisabled()

    const nameInput = screen.getByLabelText('Name')
    const categoryTypeInput = await screen.findByLabelText(CategoryType.Expense)
    const newCategoryName = faker.lorem.words(2)
    act(() => {
      userEvent.type(nameInput, newCategoryName)
      userEvent.click(categoryTypeInput)
    })

    await waitFor(() => {
      expect(submitCreatingButton).toBeEnabled()
    })

    await act(async () => {
      await userEvent.click(submitCreatingButton)
    })

    await waitFor(() => {
      expect(submitCreatingButton).not.toBeInTheDocument()
    })

    expect(await screen.findByRole('cell', { name: newCategoryName })).toBeInTheDocument()
  })

  test('A category is edited correctly.', async () => {
    render(<Settings />)

    const category = financeCategories[1]
    const currentName = category.name
    const currentType = category.type

    const cellWithCurrentName = await screen.findByRole('cell', { name: currentName })
    const categoryRow = cellWithCurrentName.parentElement
    if (!categoryRow) throw new Error('Category table row was not found.')
    const categoryEditIcon = within(categoryRow).getByTestId('EditOutlinedIcon')

    act(() => {
      userEvent.click(categoryEditIcon)
    })

    expect(screen.getByRole('dialog')).toBeInTheDocument()

    const submitButton = await screen.findByRole('button', { name: 'Submit' })
    expect(submitButton).toBeEnabled()

    const form = screen.getByRole('form', { name: 'finance-category-form' })
    expect(form).toHaveFormValues({
      name: currentName,
      typeId: String(currentType.id),
    })

    const newName = faker.lorem.words(2)

    const nameInput = screen.getByLabelText('Name')
    act(() => {
      userEvent.clear(nameInput)
      userEvent.type(nameInput, newName)
    })

    expect(nameInput).toHaveValue(newName)

    act(() => {
      userEvent.click(submitButton)
    })

    expect(await screen.findByRole('dialog')).not.toBeInTheDocument()
    expect(await screen.findByRole('cell', { name: newName })).toBeInTheDocument()
  })

  test('A category is deleted correctly.', async () => {
    render(<Settings />)

    const categoryName = financeCategories[1].name

    const cellWithCurrentName = await screen.findByRole('cell', { name: categoryName })
    const categoryRow = cellWithCurrentName.parentElement
    if (!categoryRow) throw new Error('Category table row was not found.')
    const categoryDeletionIcon = within(categoryRow).getByTestId('DeleteOutlineIcon')

    act(() => {
      userEvent.click(categoryDeletionIcon)
    })

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Delete category' })).toBeInTheDocument()

    const warning = screen.getByText(
      textContentMatcher(`Are you sure you want to delete ${categoryName} category?`),
    )
    expect(warning).toBeInTheDocument()

    const deleteButton = screen.getByRole('button', { name: 'Delete' })

    act(() => {
      userEvent.click(deleteButton)
    })

    await waitFor(async () => {
      expect(dialog).not.toBeInTheDocument()
      expect(cellWithCurrentName).not.toBeInTheDocument()
    })
  })
})
