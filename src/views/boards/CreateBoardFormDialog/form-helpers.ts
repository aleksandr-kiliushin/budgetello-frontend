import { z } from "zod"

export enum FieldName {
  DefaultCurrencySlug = "defaultCurrencySlug",
  Name = "name",
}

export const validationSchema = z.object({
  [FieldName.DefaultCurrencySlug]: z.string().nonempty(),
  [FieldName.Name]: z.string().nonempty(),
})

export type TFormValidValues = z.infer<typeof validationSchema>

export type TFormDefaultValues = {
  [FieldName.DefaultCurrencySlug]: null
  [FieldName.Name]: string
}

export const defaultValues: TFormDefaultValues = {
  [FieldName.DefaultCurrencySlug]: null,
  [FieldName.Name]: "",
}
