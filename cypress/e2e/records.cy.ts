describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/records")
    cy.get('input[name="username"]').type("john-doe")
    cy.get('input[name="password"]').type("john-doe-password")
    cy.get("button").contains("Log in").click()
  })
})
