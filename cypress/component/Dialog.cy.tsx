import React from "react"

import { Dialog } from "#components/Dialog"

const SampleComponentWithDialog: React.FC = () => {
  const [isMyDialogOpen, setIsMyDialogOpen] = React.useState(false)

  return (
    <>
      <button onClick={() => setIsMyDialogOpen(true)}>Open</button>
      {isMyDialogOpen && (
        <Dialog closeModal={() => setIsMyDialogOpen(false)}>
          <Dialog.Header>
            <h2 style={{ margin: 0 }}>My dialog heading</h2>
          </Dialog.Header>
          <Dialog.Body>My dialog body.</Dialog.Body>
          <Dialog.Footer>
            <button onClick={() => setIsMyDialogOpen(false)}>Close</button>
          </Dialog.Footer>
        </Dialog>
      )}
    </>
  )
}

describe("useDialog", () => {
  it("open-close works", () => {
    cy.viewport(800, 800)
    cy.mount(<SampleComponentWithDialog />)
    cy.contains("My dialog heading").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.contains("Close").should("not.exist")
    cy.contains("Open").click()
    cy.contains("My dialog heading").should("be.visible")
    cy.contains("My dialog body.").should("be.visible")
    cy.contains("Close").click()
    cy.contains("My dialog heading").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.contains("close").should("not.exist")
    cy.contains("Open").click()
  })
})
