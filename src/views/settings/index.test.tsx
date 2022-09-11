/** @jest-environment jsdom */
import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import faker from "faker"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Settings from "#views/settings"

describe("Finance categories service.", () => {
  test.skip("Finance categories come from backend and render correctly.", async () => {
    const { store } = render(<Settings />)

    await store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    // expect(await screen.findByRole("cell", { name: financeCategories[0].name })).toBeInTheDocument()
    // expect(await screen.findByRole("cell", { name: financeCategories[1].name })).toBeInTheDocument()
    // expect(await screen.findByRole("cell", { name: financeCategories[4].name })).toBeInTheDocument()
  })

  test("Modal for new category modal opens correctly.", async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole("button", { name: "+New" })
    expect(openModalButton).toBeInTheDocument()

    userEvent.click(openModalButton)

    const modalHeader = screen.getByRole("heading", { name: "Create category" })
    expect(modalHeader).toBeInTheDocument()

    const nameInput = screen.getByLabelText("Name")
    expect(nameInput).toBeInTheDocument()
    ;[{ name: "financeCategoryTypes" }].forEach(async ({ name }) => {
      const radioButton = await screen.findByLabelText(name)
      expect(radioButton).toBeInTheDocument()
    })

    const closeModalButton = screen.getByRole("button", { name: "Cancel" })
    expect(closeModalButton).toBeInTheDocument()

    const submitFormButton = screen.getByRole("button", { name: "Submit" })
    expect(submitFormButton).toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using Cancel button.", async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole("button", { name: "+New" })
    expect(openModalButton).toBeInTheDocument()

    userEvent.click(openModalButton)

    const modalHeader = screen.getByRole("heading", { name: "Create category" })
    expect(modalHeader).toBeInTheDocument()

    const closeModalButton = screen.getByRole("button", { name: "Cancel" })
    userEvent.click(closeModalButton)
    expect(modalHeader).not.toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using click on its backdrop.", async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole("button", { name: "+New" })
    expect(openModalButton).toBeInTheDocument()

    userEvent.click(openModalButton)

    const modalHeader = screen.getByRole("heading", { name: "Create category" })
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

  test.skip("A new category is created correctly.", async () => {
    render(<Settings />)

    const openModalButton = screen.getByRole("button", { name: "+New" })
    expect(openModalButton).toBeInTheDocument()

    userEvent.click(openModalButton)

    const submitCreatingButton = screen.getByRole("button", { name: "Submit" })
    expect(submitCreatingButton).toBeInTheDocument()
    expect(submitCreatingButton).toBeDisabled()

    const nameInput = screen.getByLabelText("Name")
    const categoryTypeInput = await screen.findByLabelText("CategoryType.Expense")
    const newCategoryName = faker.lorem.words(2)
    userEvent.type(nameInput, newCategoryName)
    userEvent.click(categoryTypeInput)

    await waitFor(() => {
      expect(submitCreatingButton).toBeEnabled()
    })

    await userEvent.click(submitCreatingButton)

    await waitFor(() => {
      expect(submitCreatingButton).not.toBeInTheDocument()
    })

    expect(await screen.findByRole("cell", { name: newCategoryName })).toBeInTheDocument()
  })

  test.skip("A category is edited correctly.", async () => {
    render(<Settings />)

    // const category = "financeCategories[1]"
    const currentName = "category.name"
    // const currentType = "category.type"

    const cellWithCurrentName = await screen.findByRole("cell", { name: currentName })
    const categoryRow = cellWithCurrentName.parentElement
    if (!categoryRow) throw new Error("Category table row was not found.")
    const categoryEditIcon = within(categoryRow).getByTestId("EditOutlinedIcon")

    userEvent.click(categoryEditIcon)

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    const submitButton = await screen.findByRole("button", { name: "Submit" })
    expect(submitButton).toBeEnabled()

    const form = screen.getByRole("form", { name: "finance-category-form" })
    expect(form).toHaveFormValues({
      name: currentName,
      typeId: String("currentType.id"),
    })

    const newName = faker.lorem.words(2)

    const nameInput = screen.getByLabelText("Name")
    userEvent.clear(nameInput)
    userEvent.type(nameInput, newName)

    expect(nameInput).toHaveValue(newName)

    userEvent.click(submitButton)

    expect(await screen.findByRole("dialog")).not.toBeInTheDocument()
    expect(await screen.findByRole("cell", { name: newName })).toBeInTheDocument()
  })

  test.skip("A category is deleted correctly.", async () => {
    render(<Settings />)

    const categoryName = "financeCategories[1].name"

    const cellWithCurrentName = await screen.findByRole("cell", { name: categoryName })
    const categoryRow = cellWithCurrentName.parentElement
    if (!categoryRow) throw new Error("Category table row was not found.")
    const categoryDeletionIcon = within(categoryRow).getByTestId("DeleteOutlineIcon")

    userEvent.click(categoryDeletionIcon)

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Delete category" })).toBeInTheDocument()

    const deleteButton = screen.getByRole("button", { name: "Delete" })

    userEvent.click(deleteButton)

    await waitFor(async () => {
      expect(dialog).not.toBeInTheDocument()
      expect(cellWithCurrentName).not.toBeInTheDocument()
    })
  })
})
