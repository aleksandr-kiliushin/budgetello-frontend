import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { render } from "#utils/testing/render"
import { testUsers } from "#utils/testing/test-users"
import { App } from "#views"

describe("Budget categories service", () => {
  test("come from backend and render correctly.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    expect(() => expect(screen.getByText("clothes")).toBeInTheDocument())
    expect(() => expect(screen.getByText("education")).toBeInTheDocument())
  })

  test("Modal for new category modal opens and renders correctly.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    userEvent.click(await screen.findByText("+New"))
    expect(await screen.findByText("Create category")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Submit")).toBeInTheDocument()
  })

  test("Modal for new category creating closes correctly using Cancel button.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    userEvent.click(await screen.findByText("+New"))
    expect(await screen.findByRole("dialog")).toBeInTheDocument()
    userEvent.click(screen.getByText("Cancel"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
  })

  test("A new category is created correctly.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    userEvent.click(await screen.findByText("+New"))
    expect(await screen.findByText("Submit")).toBeDisabled()
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "travel"))
    await waitFor(() => userEvent.click(screen.getByLabelText("expense")))
    await waitFor(() => expect(screen.getByText("Submit")).toBeEnabled())
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    await waitFor(() => expect(screen.getByRole("cell", { name: "travel" })).toBeInTheDocument())
  })

  test("case: user tries to create a category that already exists and then fixes input values.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    userEvent.click(await screen.findByText("+New"))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "education"))
    await waitFor(() => userEvent.click(screen.getByLabelText("expense")))
    userEvent.click(screen.getByText("Submit"))
    expect(await screen.findAllByText('"education" expense category already exists in this board.')).toHaveLength(2)
    expect(screen.getByText("Submit")).toBeDisabled()
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => {
      expect(screen.getAllByText('"education" expense category already exists in this board.')).toHaveLength(1)
    })
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "teaching"))
    await waitFor(() => userEvent.click(screen.getByLabelText("income")))
    await waitFor(() => {
      expect(screen.queryAllByText('"education" expense category already exists in this board.')).toHaveLength(0)
    })
    await waitFor(() => userEvent.click(screen.getByText("Submit")))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(await screen.findByRole("cell", { name: "teaching" })).toBeInTheDocument()
  })

  test("A category is edited correctly.", async () => {
    await render(<App />, { iAm: testUsers.jessicaStark.id, initialUrl: "/boards/2/settings" })

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

  test("case: user tries to create a category that already exists and then fixes input values.", async () => {
    await render(<App />, { iAm: testUsers.johnDoe.id, initialUrl: "/boards/1/settings" })

    expect(await screen.findByText("education")).toBeInTheDocument()
    await waitFor(() => userEvent.click(screen.getByTestId("education-expense-category-edit-button")))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByLabelText("Name")).toHaveValue("education")
    expect(await screen.findByLabelText("expense")).toBeChecked()
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "clothes"))
    userEvent.click(screen.getByText("Submit"))
    expect(await screen.findAllByText('"clothes" expense category already exists in this board.')).toHaveLength(2)
    await waitFor(() => userEvent.clear(screen.getByLabelText("Name")))
    await waitFor(() => userEvent.type(screen.getByLabelText("Name"), "shoes"))
    expect(await screen.findAllByText('"clothes" expense category already exists in this board.')).toHaveLength(1)
    userEvent.click(screen.getByText("Submit"))
    await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
    expect(await screen.findByText("shoes")).toBeInTheDocument()
  })

  // test("A category is deleted correctly.", async () => {
  //   await render(<App />, { iAm: testUsers.jessicaStark.id, initialUrl: "/boards/2/settings" })

  //   expect(await screen.findByText("salary")).toBeInTheDocument()

  //   userEvent.click(screen.getByTestId("salary-income-category-delete-button"))
  //   await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument())
  //   expect(screen.getByRole("heading", { name: "Delete category" })).toBeInTheDocument()
  //   userEvent.click(screen.getByText("Delete"))
  //   await waitForElementToBeRemoved(() => screen.getByRole("dialog"))
  //   expect(screen.queryByText("salary")).not.toBeInTheDocument()
  // })
})
