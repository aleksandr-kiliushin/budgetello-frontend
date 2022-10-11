import * as Yup from "yup"

import { IBudgetRecord } from "#types/budget"

export enum FormFieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface IFormValues {
  [FormFieldName.Amount]: IBudgetRecord["amount"] | null
  [FormFieldName.CategoryId]: IBudgetRecord["category"]["id"] | null
  [FormFieldName.Date]: IBudgetRecord["date"]
}

export const validationSchema = Yup.object({
  [FormFieldName.Amount]: Yup.number().required().positive(),
  [FormFieldName.CategoryId]: Yup.number().required(),
  [FormFieldName.Date]: Yup.string().required(),
})
