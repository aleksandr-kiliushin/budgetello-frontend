describe("/records", () => {
  it("records loaded correctly", () => {
    cy.visit("http://localhost:3000")
    cy.get('input[name="username"]').type("john-doe")
    cy.get('input[name="password"]').type("john-doe-password")
    cy.get("button").contains("Log in").click()

    cy.visit("http://localhost:3000/records")
    cy.url().should("include", "/records?isTrash=false")

    cy.get("td").contains("230")
    cy.get("td").contains("gifts")
    cy.get("td").contains("22-08-03")

    cy.get("td").contains("10")
    cy.get("td").contains("gifts")
    cy.get("td").contains("22-08-02")

    cy.get("td").contains("30")
    cy.get("td").contains("gifts")
    cy.get("td").contains("22-08-02")

    cy.get("td").contains("25")
    cy.get("td").contains("education")
    cy.get("td").contains("22-08-01")

    cy.get("input[name='isTrash']").click()
    cy.url().should("include", "/records?isTrash=true")

    cy.get("td").contains("400")
    cy.get("td").contains("education")
    cy.get("td").contains("22-08-01")

    cy.get("td").contains("100")
    cy.get("td").contains("clothes")
    cy.get("td").contains("22-08-01")
  })
})
