import { testUsers } from "#cypress/constants/test-users"

describe("Budget board creating", () => {
  it("case: the user inputs board name, that already exists", () => {
    cy.authorize(testUsers.johnDoe.id)

    cy.visit("/boards")
    cy.get("a#create-board").click()
    cy.get("input[name='name']").type("clever-budgetiers")
    cy.get("#mui-component-select-defaultCurrencySlug").click()
    cy.get("[role='option']").contains("USD $").click()
    cy.get("button").contains("Create").click()
    cy.contains('"clever-budgetiers" budget board already exists.').should("be.visible")
  })

  it("board craeted successfully", () => {
    cy.authorize(testUsers.johnDoe.id)

    cy.visit("/boards")
    cy.get("a#create-board").click()
    cy.get("input[name='name']").type("money-makers")
    cy.get("#mui-component-select-defaultCurrencySlug").click()
    cy.get("[role='option']").contains("USD $").click()
    cy.get("button").contains("Create").click()
    cy.url().should("equal", "http://localhost:3000/boards/5/records?isTrash=false")
    cy.contains("Board «money-makers»").should("be.visible")
  })
})
