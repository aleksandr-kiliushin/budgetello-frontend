import { z } from "zod"

export enum FieldName {
  Name = "name",
  TypeId = "typeId",
}

export const validationSchema = z.object({
  [FieldName.Name]: z.string().nonempty(),
  [FieldName.TypeId]: z.number(),
})

export type TFormValidValues = z.infer<typeof validationSchema>

export type TFormDefaultValues = {
  [FieldName.Name]: string
  [FieldName.TypeId]: number | null
}
