describe("records", () => {
  it("are loaded correctly", () => {
    cy.authorize("john-doe")

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

  it("is created correctly", () => {
    cy.authorize("john-doe")

    cy.visit("http://localhost:3000/records")
    cy.get("button").contains("+New").click()

    cy.get("input[name='amount']").type("0")
    cy.get("#mui-component-select-categoryId").click()
    cy.get("[role='option']").contains("salary").click()
    cy.get("p").contains("amount must be a positive number")
    cy.get("input[name='amount']").clear().type("2000")
    // TODO: Enter a date.
    cy.get("button").contains("Submit").click()

    cy.get("td").contains("2000")
    cy.get("td").contains("salary")
    // TODO: Check the date.
  })

  it("is edited correctly", () => {
    cy.authorize("john-doe")

    cy.visit("http://localhost:3000/records")
    cy.get("#2022-08-01-expense-education-25-edit-button").click()

    cy.get("input[name='amount']").clear().type("6666")
    cy.get("#mui-component-select-categoryId").click() // TODO: Now it does not select previously selected value because of storing value as string in form.
    cy.get("[role='option']").contains("clothes").click()
    cy.get("button").contains("Submit").click()

    cy.get("td").contains("6666")
    cy.get("td").contains("clothes")
    cy.get("td").contains("22-08-01")
  })

  it("is moved to trash correctly", () => {
    cy.authorize("john-doe")

    cy.visit("http://localhost:3000/records")
    cy.get("#2022-08-01-expense-education-25-delete-button").click()

    cy.get("input[name='isTrash']").click()

    cy.get("td").contains("25")
    cy.get("td").contains("education")
    cy.get("td").contains("22-08-01")
  })

  it("is restored correctly", () => {
    cy.authorize("john-doe")

    cy.visit("http://localhost:3000/records?isTrash=true")
    cy.get("#2022-08-01-expense-clothes-100-restore-button").click()

    cy.get("input[name='isTrash']").click()

    cy.get("td").contains("100")
    cy.get("td").contains("clothes")
    cy.get("td").contains("22-08-01")
  })

  it("is deleted from trash correctly", () => {
    cy.authorize("john-doe")

    cy.visit("http://localhost:3000/records?isTrash=true")
    cy.get("#2022-08-01-expense-clothes-100-delete-button").click()

    cy.get("td").contains("100").should("not.exist")
  })
})
