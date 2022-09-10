import { FinanceCategory, FinanceCategoryType } from "#types/finance"

export enum CategoryType {
  Expense = "expense",
  Income = "income",
}

export const financeCategoryTypes: FinanceCategoryType[] = [
  { id: 1, name: CategoryType.Expense },
  { id: 2, name: CategoryType.Income },
]

export const financeCategories: FinanceCategory[] = [
  { id: 1, name: "clothes", type: financeCategoryTypes[0] },
  { id: 2, name: "education", type: financeCategoryTypes[0] },
  { id: 3, name: "gifts", type: financeCategoryTypes[0] },
  { id: 4, name: "investments", type: financeCategoryTypes[0] },
  { id: 5, name: "salary", type: financeCategoryTypes[1] },
  { id: 6, name: "gifts", type: financeCategoryTypes[1] },
  { id: 7, name: "investments", type: financeCategoryTypes[1] },
]
