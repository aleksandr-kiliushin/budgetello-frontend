export interface IBudgetingCategory {
  id: number
  name: string
  type: IBudgetingCategoryType
}

export interface IBudgetingCategoryType {
  id: number
  name: string
}

export interface IBudgetingRecord {
  amount: number
  category: IBudgetingCategory
  date: string
  id: number
  isTrashed: boolean
}
