import { Button, Typography } from "@mui/material"
import React from "react"
import { useToggle } from "react-use"

import { Dialog } from "#components/Dialog"

const SampleComponentWithDialog: React.FC = () => {
  const [isMyDialogOpen, toggleIsMyDialogOpen] = useToggle(false)

  return (
    <>
      <button onClick={toggleIsMyDialogOpen}>Open</button>
      {isMyDialogOpen && (
        <Dialog closeDialog={toggleIsMyDialogOpen}>
          <Dialog.Header>
            <Typography variant="h2">My dialog heading</Typography>
          </Dialog.Header>
          <Dialog.Body>
            <Typography>My dialog body.</Typography>
          </Dialog.Body>
          <Dialog.Footer>
            <Button color="secondary" onClick={toggleIsMyDialogOpen} variant="contained">
              Close
            </Button>
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
    cy.get("#close-dialog").should("not.exist")
    cy.contains("Open").click()
    cy.contains("My dialog heading").should("be.visible")
    cy.contains("My dialog body.").should("be.visible")
    cy.get("#close-dialog").click()
    cy.contains("My dialog heading").should("not.exist")
    cy.contains("My dialog body.").should("not.exist")
    cy.get("#close-dialog").should("not.exist")
    cy.contains("Open").click()
  })
})
