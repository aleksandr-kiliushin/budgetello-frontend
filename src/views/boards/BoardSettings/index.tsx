import React from "react"

import { BudgetCategoriesSettings } from "./BudgetCategoriesSettings"
import { GeneralSettings } from "./GeneralSettings"
import { MembersSettings } from "./MembersSettings"

export const BoardSettings: React.FC = () => {
  return (
    <>
      <GeneralSettings />
      <br />
      <MembersSettings />
      <br />
      <BudgetCategoriesSettings />
    </>
  )
}
