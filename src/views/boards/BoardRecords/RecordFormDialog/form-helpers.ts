import { z } from "zod"

export enum FieldName {
  Amount = "amount",
  CategoryId = "categoryId",
  Comment = "comment",
  CurrencySlug = "currencySlug",
  Date = "date",
}

export const validationSchema = z.object({
  [FieldName.Amount]: z.number().positive(),
  [FieldName.CategoryId]: z.number(),
  [FieldName.Comment]: z.string(),
  [FieldName.CurrencySlug]: z.string().nonempty(),
  [FieldName.Date]: z.string(),
})

export type TFormValidValues = z.infer<typeof validationSchema>

export type TFormDefaultValues = {
  [FieldName.Amount]: number | null
  [FieldName.CategoryId]: number | null
  [FieldName.Comment]: string
  [FieldName.CurrencySlug]: string | null
  [FieldName.Date]: string
}
