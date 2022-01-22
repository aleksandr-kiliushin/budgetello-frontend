export interface FinanceCategory {
  id: number
  name: string
  type: FinanceCategoryType
}

export interface FinanceCategoryType {
  id: number
  name: string
}

export interface FinanceRecord {
  amount: number
  category: FinanceCategory
  date: string
  id: number
  isTrashed: boolean
}
