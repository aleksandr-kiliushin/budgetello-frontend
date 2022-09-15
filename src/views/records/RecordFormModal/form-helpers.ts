import * as Yup from "yup"

import { FinanceRecord } from "#types/finance"

export enum FormFieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface FormValues {
  [FormFieldName.Amount]: FinanceRecord["amount"] | null
  [FormFieldName.CategoryId]: FinanceRecord["category"]["id"] | null
  [FormFieldName.Date]: FinanceRecord["date"]
}

export const validationSchema = Yup.object({
  [FormFieldName.Amount]: Yup.number().required().positive(),
  [FormFieldName.CategoryId]: Yup.number().required(),
  [FormFieldName.Date]: Yup.string().required(),
})
