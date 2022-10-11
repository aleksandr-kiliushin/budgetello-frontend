export interface IBudgetCategory {
  id: number
  name: string
  type: IBudgetCategoryType
}

export interface IBudgetCategoryType {
  id: number
  name: string
}

export interface IBudgetRecord {
  amount: number
  category: IBudgetCategory
  date: string
  id: number
  isTrashed: boolean
}
