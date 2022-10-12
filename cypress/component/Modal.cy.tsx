import React from "react"

import { useModal } from "#components/useModal"

const TestModalComponent: React.FC = () => {
  const [Modal] = useModal()
  return <Modal />
}

describe("Modal.cy.ts", () => {
  it("playground", () => {
    cy.mount(<TestModalComponent />)
    cy.contains("Modal").should("be.visible")
  })
})
