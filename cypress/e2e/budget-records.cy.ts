import { testUsers } from "#cypress/constants/test-users"

describe("Budget records", () => {
  it("are loaded correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards/1/records")

    cy.url().should("include", "/records?isTrash=false")
    cy.contains("25").should("be.visible")
    cy.contains("education").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
    cy.get("input[name='isTrash']").click()
    cy.url().should("include", "/records?isTrash=true")
    cy.contains("400").should("be.visible")
    cy.contains("education").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
    cy.contains("100").should("be.visible")
    cy.contains("clothes").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
  })

  it("are paginated correctly", () => {
    cy.exec(`docker exec -i personal-app-database /bin/bash < ${__dirname}/insert-many-records.sh`)
    cy.authorize(testUsers.johnDoe.id)

    cy.visit("/boards/1/records")
    cy.contains("129").should("be.visible")
    cy.contains("80").should("exist").should("not.be.visible")
    cy.get("main").scrollTo("bottom")
    cy.contains("80").should("be.visible")
    cy.get("[role='progressbar'][aria-label='Loading more records']").should("be.visible")
    cy.get("[role='progressbar'][aria-label='Loading more records']").should("exist").should("not.be.visible")
    cy.contains("30").should("exist").should("not.be.visible")
    cy.get("main").scrollTo("bottom")
    cy.contains("30").should("be.visible")
    cy.get("[role='progressbar'][aria-label='Loading more records']").should("be.visible")
    cy.get("[role='progressbar'][aria-label='Loading more records']").should("not.exist")
    cy.get("td").contains("1").should("exist").should("not.be.visible")
    cy.get("main").scrollTo("bottom")
    cy.contains("education").should("be.visible")
    cy.get("[role='progressbar'][aria-label='Loading more records']").should("not.exist")
  })

  it("is created correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards/1/records")

    cy.get("[aria-label='Add record']").click()
    cy.get("input[name='amount']").type("0")
    cy.get("#mui-component-select-categoryId").click()
    cy.get("[role='option']").contains("education").click()
    cy.get("#mui-component-select-currencySlug").click()
    cy.get("[role='option']").contains("USD $").click()
    cy.get("p").contains("amount must be a positive number").should("be.visible")
    cy.get("input[name='amount']").clear().type("4.53")
    // TODO: Enter a date.
    cy.get("button").contains("Add").click()
    cy.contains("4.53").should("be.visible")
    cy.contains("education").should("be.visible")
    // TODO: Check the date.
  })

  it("is edited correctly", () => {
    cy.authorize(testUsers.johnDoe.id)

    cy.visit("/boards/1/records")
    cy.get("[aria-label='Edit record of education (expense) category, of amount 25, dated 2022-08-01']").click()
    cy.get("input[name='amount']").clear().type("66.6")
    cy.get("#mui-component-select-categoryId").click() // TODO: Now it does not select previously selected value because of storing value as string in form.
    cy.get("[role='option']").contains("clothes").click()
    cy.get("#mui-component-select-currencySlug").click()
    cy.get("[role='option']").contains("GEL ₾").click()
    cy.get("button").contains("Save").click()
    cy.contains("66.6").should("be.visible")
    cy.contains("clothes").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
  })

  it("is moved to trash correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards/1/records")

    cy.get("[aria-label='Delete record of education (expense) category, of amount 25, dated 2022-08-01']").click()
    cy.contains("25").should("not.exist")
    cy.get("input[name='isTrash']").click()
    cy.contains("25").should("be.visible")
    cy.contains("education").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
  })

  it("is restored correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards/1/records?isTrash=true")

    cy.get("[aria-label='Restore record of clothes (expense) category, of amount 100, dated 2022-08-01']").click()
    cy.contains("100").should("not.exist")
    cy.get("input[name='isTrash']").click()
    cy.contains("100").should("be.visible")
    cy.contains("clothes").should("be.visible")
    cy.contains("01 Aug 22").should("be.visible")
  })

  it("is deleted from trash correctly", () => {
    cy.authorize(testUsers.johnDoe.id)
    cy.visit("/boards/1/records?isTrash=true")

    cy.get("[aria-label='Delete record of clothes (expense) category, of amount 100, dated 2022-08-01']").click()
    cy.contains("100").should("not.exist")
  })
})
