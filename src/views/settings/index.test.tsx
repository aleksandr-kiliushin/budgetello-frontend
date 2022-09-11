/** @jest-environment jsdom */
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Settings from "#views/settings"

describe("Finance categories service", () => {
  test("Finance categories come from backend and render correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    expect(await screen.findByText("clothes")).toBeInTheDocument()
    expect(await screen.findByText("education")).toBeInTheDocument()
    expect(await screen.findAllByText("gifts")).toHaveLength(2)
    expect(await screen.findByText("salary")).toBeInTheDocument()
  })

  test("Modal for new category modal opens and renders correctly.", async () => {
    render(<Settings />)

    userEvent.click(screen.getByText("+New"))
    expect(screen.getByText("Create category")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Submit")).toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using Cancel button.", async () => {
    render(<Settings />)

    userEvent.click(screen.getByText("+New"))
    expect(screen.getByText("Create category")).toBeInTheDocument()
    userEvent.click(screen.getByText("Cancel"))
    expect(screen.queryByText("Create category")).not.toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using click on its backdrop.", async () => {
    render(<Settings />)
    userEvent.click(screen.getByText("+New"))
    expect(screen.getByText("Create category")).toBeInTheDocument()
  })

  test("A new category is created correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    userEvent.click(screen.getByText("+New"))
    expect(screen.getByText("Submit")).toBeDisabled()
    userEvent.type(screen.getByLabelText("Name"), "travel")
    await waitFor(() => userEvent.click(screen.getByLabelText("expense")))
    expect(screen.getByText("Submit")).toBeEnabled()
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(await screen.findByRole("cell", { name: "travel" })).toBeInTheDocument()
  })

  test("A category is edited correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    expect(await screen.findByText("salary")).toBeInTheDocument()
    await waitFor(() => userEvent.click(screen.getByTestId("salary-income-category-edit-button")))

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toHaveValue("salary")
    expect(await screen.findByLabelText("income")).toBeChecked()

    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "casino"))
    await waitFor(() => userEvent.click(screen.getByLabelText("expense")))
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))

    expect(await screen.findByText("casino")).toBeInTheDocument()
    expect(screen.getByTestId("casino-expense-category-edit-button")).toBeInTheDocument()
    expect(screen.queryByText("salary")).not.toBeInTheDocument()
  })

  test("A category is deleted correctly.", async () => {
    const { store } = render(<Settings />)
    store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

    expect(await screen.findByText("salary")).toBeInTheDocument()
    userEvent.click(screen.getByTestId("salary-income-category-delete-button"))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Delete category" })).toBeInTheDocument()
    userEvent.click(screen.getByText("Delete"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(screen.queryByText("salary")).not.toBeInTheDocument()
  })
})
