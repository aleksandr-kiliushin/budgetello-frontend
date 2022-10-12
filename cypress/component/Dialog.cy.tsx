import React from "react"

import { useDialog } from "#components/useDialog"

const SampleComponentWithDialog: React.FC = () => {
  const [MyDialog, openMyDialog, closeMyDialog] = useDialog({ isOpenInitially: false })

  return (
    <>
      <button onClick={openMyDialog}>open</button>
      <button onClick={closeMyDialog}>close</button>
      <MyDialog>MyDialog</MyDialog>
    </>
  )
}

describe("useDialog", () => {
  it("open-close works", () => {
    cy.mount(<SampleComponentWithDialog />)
    cy.contains("MyDialog").should("not.exist")
    cy.contains("open").click()
    cy.contains("MyDialog").should("be.visible")
    cy.contains("close").click()
    cy.contains("MyDialog").should("not.exist")
  })
})
