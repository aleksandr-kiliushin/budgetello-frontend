import * as Yup from "yup"

import { BudgetRecord } from "#api/types"

export enum FieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Comment = "comment",
  CurrencySlug = "currencySlug",
  Date = "date",
}

export interface IFormValues {
  [FieldName.Amount]: BudgetRecord["amount"] | null
  [FieldName.CategoryId]: BudgetRecord["category"]["id"] | null
  [FieldName.Comment]: BudgetRecord["comment"]
  [FieldName.CurrencySlug]: BudgetRecord["currency"]["slug"]
  [FieldName.Date]: BudgetRecord["date"]
}

export const validationSchema = Yup.object({
  [FieldName.Amount]: Yup.number().required().positive(),
  [FieldName.CategoryId]: Yup.number().required(),
  [FieldName.Comment]: Yup.string(),
  [FieldName.CurrencySlug]: Yup.string().required(),
  [FieldName.Date]: Yup.string().required(),
})
