import { testUsers } from "#cypress/constants/test-users"

describe("redirect unauthorized users", () => {
  it("unauthorized users are redirected to /auth.", () => {
    cy.visit("/boards")
    cy.url().should("include", "/auth")
  })

  it("authorized users are NOT redirected to /auth.", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards")
    cy.wait(500)
    cy.url().should("include", "/boards")
  })
})
