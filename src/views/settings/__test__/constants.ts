import { IFinanceCategory, IFinanceCategoryType } from '#interfaces/finance'

export const categoryTypes: IFinanceCategoryType[] = [
  { id: 1, name: 'expense' },
  { id: 2, name: 'income' },
]

export const categories: IFinanceCategory[] = [
  { id: 1, name: 'Clothes', type: categoryTypes[0] },
  { id: 2, name: 'Education', type: categoryTypes[0] },
  { id: 3, name: 'Salary', type: categoryTypes[1] },
]
