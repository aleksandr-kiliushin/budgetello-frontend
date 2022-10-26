import { testUsers } from "#cypress/constants/test-users"

describe("Authorization", () => {
  it("logs in successfully", () => {
    cy.visit("/auth")

    expect(localStorage.authorizationToken).to.be.equal(undefined)
    cy.contains("Welcome").should("be.visible")
    cy.contains("Log in").should("be.disabled")
    cy.get('input[name="username"]').type("john-doe")
    cy.get('input[name="password"]').type("john-doe-password")
    cy.contains("Log in").should("be.enabled").click()
    cy.contains("Welcome").should("not.exist")
    expect(localStorage.authorizationToken).to.match(/.+/)
    cy.contains("Log in").should("not.exist")
    cy.contains("Log out").should("be.visible")
    cy.contains("You are logged in as john-doe.").should("be.visible")
    cy.url().should("equal", "http://localhost:3000/")
  })

  it("case: user enters unexisting username", () => {
    cy.visit("/auth")

    cy.get('input[name="username"]').type("john-doe-WITH-A-TYPO")
    cy.get('input[name="password"]').type("john-doe-password")
    cy.contains("Log in").click()
    cy.contains("User not found.").should("be.visible")
    cy.get('input[name="username"]').clear().type("john-doe")
    cy.contains("Log in").click()
    cy.contains("You are logged in as john-doe.").should("be.visible")
    cy.url().should("equal", "http://localhost:3000/")
  })

  it("case: user enters invalid password", () => {
    cy.visit("/auth")

    cy.get('input[name="username"]').type("john-doe")
    cy.get('input[name="password"]').type("john-doe-password-WITH-A-TYPO")
    cy.contains("Log in").click()
    cy.contains("Invalid password.").should("be.visible")
    cy.get('input[name="password"]').clear().type("john-doe-password")
    cy.contains("Log in").click()
    cy.contains("You are logged in as john-doe.").should("be.visible")
    cy.url().should("equal", "http://localhost:3000/")
  })

  it("logs out successfully", (done) => {
    cy.on("uncaught:exception", (error) => {
      expect(error.message).to.include("Invalid token.")
      done()
      return false
    })

    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/auth")

    expect(localStorage.authorizationToken).to.match(/.+/)
    cy.contains("Log out").click()
    cy.contains("Log in").should("be.visible")
    expect(localStorage.authorizationToken).to.be.equal(undefined)
  })
})
