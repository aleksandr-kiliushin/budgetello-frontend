import { FinanceRecord } from '#types/finance'

export enum FormField {
  Amount = 'amount',
  CategoryId = 'categoryId',
  Date = 'date',
}

export interface FormValues {
  [FormField.Amount]: FinanceRecord['amount'] | null
  [FormField.CategoryId]: FinanceRecord['category']['id'] | null
  [FormField.Date]: FinanceRecord['date']
}
