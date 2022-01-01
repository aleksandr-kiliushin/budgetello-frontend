import { IFinanceRecord } from '#interfaces/finance'

export enum FormField {
  Amount = 'amount',
  CategoryId = 'categoryId',
  Date = 'date',
}

export interface FormValues {
  [FormField.Amount]: IFinanceRecord['amount'] | null
  [FormField.CategoryId]: IFinanceRecord['category']['id'] | null
  [FormField.Date]: IFinanceRecord['date']
}
