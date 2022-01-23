import { FinanceRecord } from '#types/finance'

export enum FormFieldName {
  Amount = 'amount',
  CategoryId = 'categoryId',
  Date = 'date',
}

export interface FormValues {
  [FormFieldName.Amount]: FinanceRecord['amount'] | null
  [FormFieldName.CategoryId]: FinanceRecord['category']['id'] | null
  [FormFieldName.Date]: FinanceRecord['date']
}
