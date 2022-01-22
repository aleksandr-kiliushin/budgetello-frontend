import { FinanceCategory, FinanceCategoryType } from '#types/finance'

export enum FormField {
  Name = 'name',
  TypeId = 'typeId',
}

export interface FormValues {
  [FormField.Name]: FinanceCategory['name']
  [FormField.TypeId]: FinanceCategoryType['id']
}
