import React from "react"

import { BudgetCategoriesSettings } from "./BudgetCategoriesSettings"
import { MembersSettings } from "./MembersSettings"

export const BoardSettings: React.FC = () => {
  return (
    <>
      <MembersSettings />
      <br />
      <BudgetCategoriesSettings />
    </>
  )
}
