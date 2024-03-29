import { testUsers } from "#cypress/constants/test-users"

describe("Budget board settings", () => {
  describe("General settings", () => {
    describe("Board name settings", () => {
      it("case: the user edits board name, but does not save it", () => {
        cy.authorize(testUsers.johnDoe.id)
        cy.visit("/boards/1/settings")

        cy.get("td").contains("clever-budgetiers").should("be.visible")
        cy.get("[aria-label='Edit board name']").click()
        cy.get("input[name='name']").clear().type("money-makers")
        cy.get("[aria-label='Cancel board name editing']").click()
        cy.get("td").contains("money-makers").should("not.exist")
        cy.get("td").contains("clever-budgetiers").should("be.visible")
      })

      it("board name is edited correctly", () => {
        cy.authorize(testUsers.johnDoe.id)
        cy.visit("/boards/1/settings")

        cy.get("td").contains("clever-budgetiers").should("be.visible")
        cy.get("[aria-label='Edit board name']").click()
        cy.get("input[name='name']").clear().type("money-makers")
        cy.get("[aria-label='Submit board name editing']").click()
        cy.get("td").contains("money-makers").should("be.visible")
        cy.get("td").contains("clever-budgetiers").should("not.exist")
        cy.visit("/boards/1/records")
        cy.get("h1").contains("clever-budgetiers").should("not.exist")
        cy.get("h1").contains("money-makers").should("be.visible")
      })
    })

    describe("Default currency settings", () => {
      it("case: the user edits default currency name, but does not save it", () => {
        cy.authorize(testUsers.johnDoe.id)
        cy.visit("/boards/1/settings")

        cy.get("td").contains("GEL ₾").should("be.visible")
        cy.get("[aria-label='Edit board default currency']").click()
        cy.get("#mui-component-select-defaultCurrencySlug").click()
        cy.get("[role='option']").contains("USD $").click()
        cy.get("[aria-label='Cancel board default currency editing']").click()
        cy.get("td").contains("USD $").should("not.exist")
        cy.get("td").contains("GEL ₾").should("be.visible")
      })

      it("board default currency is edited correctly", () => {
        cy.authorize(testUsers.johnDoe.id)

        cy.visit("/boards/1/records/add")
        cy.get("#mui-component-select-currencySlug").should("contain", "GEL ₾")

        cy.visit("/boards/1/settings")
        cy.get("td").contains("GEL ₾").should("be.visible")
        cy.get("[aria-label='Edit board default currency']").click()
        cy.get("#mui-component-select-defaultCurrencySlug").click()
        cy.get("[role='option']").contains("USD $").click()
        cy.get("[aria-label='Submit board default currency editing']").click()
        cy.get("td").contains("GEL ₾").should("not.exist")
        cy.get("td").contains("USD $").should("be.visible")

        cy.visit("/boards/1/records/add")
        cy.get("#mui-component-select-currencySlug").should("contain", "USD $")
      })
    })
  })

  describe("Budget categories settings", () => {
    it("budget board settings are fetched and rendered correctly", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.contains("clothes").should("be.visible")
      cy.contains("education").should("be.visible")
    })

    it("a budget category form dialog opens and closes correctly", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.get("[aria-label='Add budget category']").click()
      cy.get('[role="dialog"]').should("be.visible")
      cy.contains("Cancel").click()
      cy.get('[role="dialog"]').should("not.exist")
    })

    it("a new budget category is created correctly", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.get("[aria-label='Add budget category']").click()
      cy.get("button").contains("Add").should("be.disabled")
      cy.get('input[name="name"]').type("travel")
      cy.get('input[name="typeId"][value="1"]').click() // Select "Expense" category type.
      cy.get("button").contains("Add").click()
      cy.get('[role="dialog"]').should("not.exist")
      cy.contains("travel").should("be.visible")
    })

    it("case: user tries to create a category that already exists and then fixes input values", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.get("[aria-label='Add budget category']").click()
      cy.get('input[name="name"]').type("education")
      cy.get('input[name="typeId"][value="1"]').click() // Select "Expense" category type.
      cy.get("button").contains("Add").click()
      cy.get("body")
        .find("p")
        .filter((index, node) => node.innerText === '"education" expense category already exists in this board.')
        .should("have.length", 2)
      cy.get("button").contains("Add").should("be.disabled")
      cy.get('input[name="name"]').clear()
      cy.get("body")
        .find("p")
        .filter((index, node) => node.innerText === '"education" expense category already exists in this board.')
        .should("have.length", 1)
      cy.get('input[name="name"]').type("teaching")
      cy.get('input[name="typeId"][value="2"]').click() // Select "Income" category type.
      cy.get("body")
        .find("p")
        .filter((index, node) => node.innerText === '"education" expense category already exists in this board.')
        .should("have.length", 0)
      cy.get("button").contains("Add").click()
      cy.get('[role="dialog"]').should("not.exist")
      cy.contains("teaching").should("be.visible")
    })

    it("a budget category is edited correctly", () => {
      cy.authorize(testUsers.jessicaStark.id)
      cy.visit("/boards/2/settings")

      cy.contains("salary").should("be.visible")
      cy.get("[aria-label='Edit salary (income) budget category']").click()
      cy.get('[role="dialog"]').should("be.visible")
      cy.get('input[name="name"]').should("have.value", "salary")
      cy.get('input[name="typeId"][value="2"]').should("be.checked") // "Income" category type is selected.
      cy.get('input[name="name"]').clear().type("casino")
      cy.get('input[name="typeId"][value="1"]').click() // Select "expense" category type.
      cy.get("button").contains("Save").click()
      cy.get('[role="dialog"]').should("not.exist")
      cy.contains("salary").should("not.exist")
      cy.contains("casino").should("be.visible")
      cy.get("[aria-label='Edit casino (expense) budget category']").should("be.visible")
    })

    it("case: user tries to update a budget category but resulting category already exists, then the user fixes form values", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.contains("education").should("be.visible")
      cy.get("[aria-label='Edit education (expense) budget category']").click()
      cy.get('[role="dialog"]').should("be.visible")
      cy.get('input[name="name"]').should("have.value", "education")
      cy.get('input[name="typeId"][value="1"]').should("be.checked") // "Expense" category type is selected.
      cy.get('input[name="name"]').clear().type("clothes")
      cy.get("button").contains("Save").click()
      cy.get("body")
        .find("p")
        .filter((index, node) => node.innerText === '"clothes" expense category already exists in this board.')
        .should("have.length", 2)
      cy.get('input[name="name"]').clear().type("shoes")
      cy.get("body")
        .find("p")
        .filter((index, node) => node.innerText === '"clothes" expense category already exists in this board.')
        .should("have.length", 1)
      cy.get("button").contains("Save").click()
      cy.get('[role="dialog"]').should("not.exist")
      cy.contains("shoes").should("be.visible")
    })

    it.skip("a budget category is deleted correctly", () => {
      cy.authorize(testUsers.johnDoe.id)
      cy.visit("/boards/1/settings")

      cy.contains("clothes").should("be.visible")
      cy.get("[aria-label='Delete clothes (expense) budget category']").click()
      cy.get('[role="dialog"]').should("be.visible")
      cy.contains("Yes, delete").click()
      cy.get('[role="dialog"]').should("not.exist")
      cy.contains("clothes").should("not.exist")
    })
  })
})
