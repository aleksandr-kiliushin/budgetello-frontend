import { testUsers } from "#cypress/constants/test-users"

describe("Authorization", () => {
  describe("registration", () => {
    it("case: the user inputs a username that is already taken", () => {
      cy.visit("/registration")
      cy.get('input[name="username"]').type("john-doe")
      cy.get('input[name="password"]').type("123")
      cy.get('input[name="passwordConfirmation"]').type("123")
      cy.get("button").contains("Register").click()
      cy.contains("Already exists.").should("be.visible")
    })

    it("case: the user inputs incorrect password confirmation", () => {
      cy.visit("/registration")
      cy.get('input[name="username"]').type("andrew-smith")
      cy.get('input[name="password"]').type("andrew-smith-password")
      cy.get('input[name="passwordConfirmation"]').type("INCORRECT-andrew-smith-password")
      cy.get("button").contains("Register").click()
      cy.contains("Passwords do not match.").should("be.visible")
    })

    it("registers successfully, then logs in", () => {
      cy.visit("/registration")
      cy.get('input[name="username"]').type("andrew-smith")
      cy.get('input[name="password"]').type("andrew-smith-password")
      cy.get('input[name="passwordConfirmation"]').type("andrew-smith-password")
      cy.get("button").contains("Register").click()
      cy.url().should("equal", "http://localhost:3000/auth")
      cy.get('input[name="username"]').type("andrew-smith")
      cy.get('input[name="password"]').type("andrew-smith-password")
      cy.get("button").contains("Log in").click()
      cy.url().should("equal", "http://localhost:3000/boards")
      cy.visit("/auth")
      cy.contains("Hello, andrew-smith.")
    })
  })

  describe("Logging in", () => {
    it("logs in successfully", () => {
      cy.visit("/auth")
      expect(localStorage.authorizationToken).to.be.equal(undefined)
      cy.contains("Welcome").should("be.visible")
      cy.contains("Log in").should("be.disabled")
      cy.get('input[name="username"]').type("john-doe")
      cy.get('input[name="password"]').type("john-doe-password")
      cy.contains("Log in").click()
      cy.contains("Welcome").should("not.exist")
      cy.should(() => expect(localStorage.authorizationToken).to.match(/.+/))
      cy.url().should("equal", "http://localhost:3000/boards")
      cy.visit("/auth")
      cy.contains("Log in").should("not.exist")
      cy.contains("Log out").should("be.visible")
      cy.contains("Hello, john-doe.").should("be.visible")
    })

    it("case: user enters unexisting username", () => {
      cy.visit("/auth")
      cy.get('input[name="username"]').type("john-doe-WITH-A-TYPO")
      cy.get('input[name="password"]').type("john-doe-password")
      cy.contains("Log in").click()
      cy.contains("User not found.").should("be.visible")
    })

    it("case: user enters invalid password", () => {
      cy.visit("/auth")
      cy.get('input[name="username"]').type("john-doe")
      cy.get('input[name="password"]').type("john-doe-password-WITH-A-TYPO")
      cy.contains("Log in").click()
      cy.contains("Invalid password.").should("be.visible")
    })

    it("logs out successfully", () => {
      cy.on("uncaught:exception", () => {
        // This UNAUTHORIZED error occurs right after logging out: frontend asks for authorized user data.
        // But there is no authorizationToken on the client bacause we logged out a moment before.
        return false
      })
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/auth").should(() => expect(localStorage.authorizationToken).to.match(/.+/))
      cy.contains("Log out").click()
      cy.contains("Log in").should("be.visible")
      cy.should(() => expect(localStorage.authorizationToken).to.be.equal(undefined))
    })
  })
})
