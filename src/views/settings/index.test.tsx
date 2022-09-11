/** @jest-environment jsdom */
import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import faker from "faker"
import { act } from "react-dom/test-utils"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Settings from "#views/settings"

describe("Finance categories service.", () => {
  test("Finance categories come from backend and render correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    expect(await screen.findByRole("cell", { name: "clothes" })).toBeInTheDocument()
    expect(await screen.findByRole("cell", { name: "education" })).toBeInTheDocument()
    expect(await screen.findAllByRole("cell", { name: "gifts" })).toHaveLength(2)
    expect(await screen.findByRole("cell", { name: "salary" })).toBeInTheDocument()
  })

  test("Modal for new category modal opens and renders correctly.", async () => {
    render(<Settings />)
    userEvent.click(screen.getByRole("button", { name: "+New" }))
    expect(screen.getByRole("heading", { name: "Create category" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using Cancel button.", async () => {
    render(<Settings />)
    userEvent.click(screen.getByRole("button", { name: "+New" }))
    const modalHeader = screen.getByRole("heading", { name: "Create category" })
    expect(modalHeader).toBeInTheDocument()
    userEvent.click(screen.getByRole("button", { name: "Cancel" }))
    expect(modalHeader).not.toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using click on its backdrop.", async () => {
    render(<Settings />)
    userEvent.click(screen.getByRole("button", { name: "+New" }))
    const modalHeader = screen.getByRole("heading", { name: "Create category" })
    expect(modalHeader).toBeInTheDocument()
  })

  test("A new category is created correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    userEvent.click(screen.getByRole("button", { name: "+New" }))
    const submitCreatingButton = screen.getByRole("button", { name: "Submit" })
    expect(submitCreatingButton).toBeDisabled()

    userEvent.type(screen.getByLabelText("Name"), "travel")
    await act(async () => {
      userEvent.click(await screen.findByLabelText("expense"))
    })

    expect(submitCreatingButton).toBeEnabled()
    act(() => {
      userEvent.click(submitCreatingButton)
    })

    expect(await screen.findByRole("cell", { name: "travel" })).toBeInTheDocument()
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
