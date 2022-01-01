import { IFinanceCategory, IFinanceCategoryType } from '#interfaces/finance'

export enum FormField {
  Name = 'name',
  TypeId = 'typeId',
}

export interface FormValues {
  [FormField.Name]: IFinanceCategory['name']
  [FormField.TypeId]: IFinanceCategoryType['id']
}
