import { testUsers } from "#utils/testing/test-users"

describe("Budget records", () => {
  it("is deleted correctly", () => {
    cy.authorize(testUsers.johnDoe.id)

    cy.visit("/boards/1/settings")

    cy.contains("clothes").should("be.visible")
    cy.get("body").find('[data-testid="clothes-expense-category-delete-button"]').first().click()
    cy.get("body").get('[role="dialog"]').should("be.visible")
    cy.contains("Yes, delete").click()
    cy.get("body").get('[role="dialog"]').should("not.exist")
    cy.contains("clothes").should("not.exist")
  })
})
