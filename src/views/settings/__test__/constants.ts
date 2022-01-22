import { FinanceCategory, FinanceCategoryType } from '#types/finance'

export const categoryTypes: FinanceCategoryType[] = [
  { id: 1, name: 'expense' },
  { id: 2, name: 'income' },
]

export const categories: FinanceCategory[] = [
  { id: 1, name: 'Clothes', type: categoryTypes[0] },
  { id: 2, name: 'Education', type: categoryTypes[0] },
  { id: 3, name: 'Salary', type: categoryTypes[1] },
]
