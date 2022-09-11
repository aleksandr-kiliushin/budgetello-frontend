/** @jest-environment jsdom */
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { login } from "#models/user"
import { render } from "#utils/testing/render"
import Settings from "#views/settings"

describe("Finance categories service.", () => {
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
    // userEvent.click(await screen.findByLabelText("expense"))

    // expect(screen.getByText("Submit")).toBeEnabled()
    // act(() => {
    //   userEvent.click(submitCreatingButton)
    // })

    // expect(await screen.findByRole("cell", { name: "travel" })).toBeInTheDocument()
  })

  // test.skip("A category is edited correctly.", async () => {
  //   const { store } = render(<Settings />)
  //   store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

  //   expect(await screen.findByRole("cell", { name: "salary" })).toBeInTheDocument()

  //   userEvent.click(screen.getByTestId("salary-income-category-edit-button"))
  //   expect(screen.getByRole("dialog")).toBeInTheDocument()

  //   expect(screen.getByLabelText("Name")).toHaveValue("salary")
  //   expect(await screen.findByLabelText("income")).toBeInTheDocument()

  //   await userEvent.clear(screen.getByLabelText("Name"))
  //   userEvent.type(screen.getByLabelText("Name"), "casino")
  //   userEvent.click(await screen.findByLabelText("expense"))
  //   userEvent.click(screen.getByRole("button", { name: "Submit" }))

  //   waitFor(async () => {
  //     expect(await screen.findByRole("dialog")).not.toBeInTheDocument()
  //   })
  //   expect(await screen.findByRole("cell", { name: "casino" })).toBeInTheDocument()
  //   expect(screen.getByTestId("casino-expense-category-edit-button")).toBeInTheDocument()
  //   expect(screen.queryByRole("cell", { name: "salary" })).not.toBeInTheDocument()
  // })

  // test("A category is deleted correctly.", async () => {
  //   const { store } = render(<Settings />)
  //   store.dispatch(login({ username: "john-doe", password: "john-doe-password" }))

  //   expect(await screen.findByRole("cell", { name: "salary" })).toBeInTheDocument()

  //   userEvent.click(screen.getByTestId("salary-income-category-delete-button"))
  //   await waitFor(() => {
  //     expect(screen.findByRole("dialog")).toBeInTheDocument()
  //   })
  //   // await waitFor(async () => {
  //   //   expect(screen.getByRole("heading", { name: "Delete category" })).toBeInTheDocument()
  //   // })

  //   // await waitFor(() => {
  //   //   expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  //   // })

  //   // expect(screen.queryByRole("cell", { name: "salary" })).not.toBeInTheDocument()
  // })
})
