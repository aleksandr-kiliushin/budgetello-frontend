import { testUsers } from "#cypress/constants/test-users"

describe("Color mode", () => {
  it("switches correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/auth")

    expect(localStorage.colorMode).to.be.equal(undefined)
    cy.contains("Switch mode").click()
    cy.should(() => expect(localStorage.colorMode).to.be.equal("dark"))
    cy.contains("Switch mode").click()
    cy.should(() => expect(localStorage.colorMode).to.be.equal("light"))
    cy.contains("Switch mode").click()
    cy.should(() => expect(localStorage.colorMode).to.be.equal("dark"))
  })
})
