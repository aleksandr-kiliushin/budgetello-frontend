import * as Yup from "yup"

import { IFinanceRecord } from "#types/finance"

export enum FormFieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface IFormValues {
  [FormFieldName.Amount]: IFinanceRecord["amount"] | null
  [FormFieldName.CategoryId]: IFinanceRecord["category"]["id"] | null
  [FormFieldName.Date]: IFinanceRecord["date"]
}

export const validationSchema = Yup.object({
  [FormFieldName.Amount]: Yup.number().required().positive(),
  [FormFieldName.CategoryId]: Yup.number().required(),
  [FormFieldName.Date]: Yup.string().required(),
})
