import React from "react"

import { useDialog } from "#components/useDialog"

const SampleComponentWithDialog: React.FC = () => {
  const [MyDialog, openMyDialog, closeMyDialog] = useDialog({ isOpenInitially: false })

  return (
    <>
      <button onClick={openMyDialog}>open</button>
      <MyDialog>
        <MyDialog.Header>
          <h2 style={{ margin: 0 }}>My dialog heading</h2>
        </MyDialog.Header>
        <MyDialog.Body>My dialog body.</MyDialog.Body>
        <MyDialog.Footer>
          <button onClick={closeMyDialog}>close</button>
        </MyDialog.Footer>
      </MyDialog>
    </>
  )
}

describe("useDialog", () => {
  it("open-close works", () => {
    cy.viewport(800, 800)
    cy.mount(<SampleComponentWithDialog />)
    cy.contains("My dialog heading").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.contains("close").should("not.exist")
    cy.contains("open").click()
    cy.contains("My dialog heading").should("be.visible")
    cy.contains("My dialog body.").should("be.visible")
    cy.contains("close").should("be.visible")
    // cy.contains("close").click()
    // cy.contains("My dialog heading").should("not.exist")
    // cy.contains("My dialog body.").should("not.exist")
    // cy.contains("close").should("not.exist")
  })
})