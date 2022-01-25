import { FinanceCategory, FinanceCategoryType } from '#types/finance'

export const financeCategoryTypes: FinanceCategoryType[] = [
  { id: 1, name: 'expense' },
  { id: 2, name: 'income' },
]

export const financeCategories: FinanceCategory[] = [
  { id: 1, name: 'Clothes', type: financeCategoryTypes[0] },
  { id: 2, name: 'Education', type: financeCategoryTypes[0] },
  { id: 3, name: 'Salary', type: financeCategoryTypes[1] },
]
