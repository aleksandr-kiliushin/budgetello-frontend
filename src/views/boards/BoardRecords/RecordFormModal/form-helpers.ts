import * as Yup from "yup"

import { IBudgetRecord } from "#types/budget"

export enum FormField {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface IFormValues {
  [FormField.Amount]: IBudgetRecord["amount"] | null
  [FormField.CategoryId]: IBudgetRecord["category"]["id"] | null
  [FormField.Date]: IBudgetRecord["date"]
}

export const validationSchema = Yup.object({
  [FormField.Amount]: Yup.number().required().positive(),
  [FormField.CategoryId]: Yup.number().required(),
  [FormField.Date]: Yup.string().required(),
})
