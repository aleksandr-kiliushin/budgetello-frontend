import React from "react"

import { useDialog } from "#components/useDialog"

const SampleComponentWithDialog: React.FC = () => {
  const [MyDialog, openMyDialog, closeMyDialog] = useDialog({ isOpenInitially: false })

  return (
    <>
      <button onClick={openMyDialog}>open</button>
      <button onClick={closeMyDialog}>close</button>
      <MyDialog>
        <MyDialog.Header>My dialog header.</MyDialog.Header>
        <MyDialog.Body>My dialog body.</MyDialog.Body>
        <MyDialog.Footer>My dialog footer.</MyDialog.Footer>
      </MyDialog>
    </>
  )
}

describe("useDialog", () => {
  it("open-close works", () => {
    cy.viewport(620, 620)
    cy.mount(<SampleComponentWithDialog />)
    cy.contains("My dialog header.").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.contains("My dialog footer.").should("not.exist")
    cy.contains("open").click()
    cy.contains("My dialog header.").should("be.visible")
    cy.contains("My dialog body.").should("be.visible")
    cy.contains("My dialog footer.").should("be.visible")
    cy.contains("close").click()
    cy.contains("My dialog header.").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.contains("My dialog footer.").should("not.exist")
  })
})
