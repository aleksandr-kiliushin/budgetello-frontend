/** @jest-environment jsdom */
import { screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

  test.only("A category is edited correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    const cellWithCurrentName = await screen.findByRole("cell", { name: "salary" })
    const categoryRow = cellWithCurrentName.parentElement
    if (categoryRow === null) throw new Error("'salary' category row was not found in table.")

    act(() => {
      userEvent.click(screen.getByTestId("salary-income-category-edit-button"))
    })

    expect(screen.getByRole("dialog")).toBeInTheDocument()

    expect(screen.getByLabelText("Name")).toHaveValue("salary")
    expect(await screen.findByLabelText("income")).toBeInTheDocument()

    await act(async () => {
      await userEvent.clear(screen.getByLabelText("Name"))
      userEvent.type(screen.getByLabelText("Name"), "casino")
      userEvent.click(await screen.findByLabelText("expense"))
      userEvent.click(screen.getByRole("button", { name: "Submit" }))
    })

    waitFor(async () => {
      expect(await screen.findByRole("dialog")).not.toBeInTheDocument()
    })
    expect(await screen.findByRole("cell", { name: "casino" })).toBeInTheDocument()
    expect(screen.getByTestId("casino-expense-category-edit-button")).toBeInTheDocument()
    expect(screen.queryByRole("cell", { name: "salary" })).not.toBeInTheDocument()
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
