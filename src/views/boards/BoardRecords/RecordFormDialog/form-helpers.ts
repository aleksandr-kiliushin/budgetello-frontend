import * as Yup from "yup"

import { BudgetRecord } from "#api/types"

export enum FormField {
  Amount = "amount",
  CategoryId = "categoryId",
  Date = "date",
}

export interface IFormValues {
  [FormField.Amount]: BudgetRecord["amount"] | null
  [FormField.CategoryId]: BudgetRecord["category"]["id"] | null
  [FormField.Date]: BudgetRecord["date"]
}

export const validationSchema = Yup.object({
  [FormField.Amount]: Yup.number().required().positive(),
  [FormField.CategoryId]: Yup.number().required(),
  [FormField.Date]: Yup.string().required(),
})
