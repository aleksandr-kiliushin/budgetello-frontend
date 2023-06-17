import * as Yup from "yup"

import { Board, Currency } from "#api/types"

export enum FieldName {
  DefaultCurrencySlug = "defaultCurrencySlug",
  Name = "name",
}

export type TFormValues = {
  [FieldName.DefaultCurrencySlug]: Currency["slug"] | null
  [FieldName.Name]: Board["name"]
}

export const validationSchema = Yup.object({
  [FieldName.DefaultCurrencySlug]: Yup.string().required(),
  [FieldName.Name]: Yup.string().required(),
})

export const defaultValues: TFormValues = {
  [FieldName.DefaultCurrencySlug]: null,
  [FieldName.Name]: "",
}
