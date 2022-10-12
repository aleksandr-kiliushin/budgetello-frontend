import React from "react"

import { useModal } from "#components/useModal"

const TestModalComponent: React.FC = () => {
  const [MyModal, openMyModal, closeMyModal] = useModal({ isOpenInitially: false })

  return (
    <>
      <button onClick={openMyModal}>open</button>
      <button onClick={closeMyModal}>close</button>
      <MyModal>MyModal</MyModal>
    </>
  )
}

describe("useModal", () => {
  it("open-close works", () => {
    cy.mount(<TestModalComponent />)
    cy.contains("MyModal").should("not.exist")
    cy.contains("open").click()
    cy.contains("MyModal").should("be.visible")
    cy.contains("close").click()
    cy.contains("MyModal").should("not.exist")
  })
})
