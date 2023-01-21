import * as Yup from "yup"

import { BudgetRecord } from "#api/types"

export enum FieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  CurrencySlug = "currencySlug",
  Date = "date",
}

export interface IFormValues {
  [FieldName.Amount]: BudgetRecord["amount"] | null
  [FieldName.CategoryId]: BudgetRecord["category"]["id"] | null
  [FieldName.CurrencySlug]: BudgetRecord["currency"]["slug"]
  [FieldName.Date]: BudgetRecord["date"]
}

export const validationSchema = Yup.object({
  [FieldName.Amount]: Yup.number().required().positive(),
  [FieldName.CategoryId]: Yup.number().required(),
  [FieldName.Date]: Yup.string().required(),
})
