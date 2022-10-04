import * as Yup from "yup"

import { IBudgetingRecord } from "#types/budgeting"

export enum FormFieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface IFormValues {
  [FormFieldName.Amount]: IBudgetingRecord["amount"] | null
  [FormFieldName.CategoryId]: IBudgetingRecord["category"]["id"] | null
  [FormFieldName.Date]: IBudgetingRecord["date"]
}

export const validationSchema = Yup.object({
  [FormFieldName.Amount]: Yup.number().required().positive(),
  [FormFieldName.CategoryId]: Yup.number().required(),
  [FormFieldName.Date]: Yup.string().required(),
})
