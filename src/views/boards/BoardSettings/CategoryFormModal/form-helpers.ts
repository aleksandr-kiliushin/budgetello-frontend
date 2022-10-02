import * as yup from "yup"

export enum FormField {
  Name = "name",
  TypeId = "typeId",
}

export const validationSchema = yup
  .object({
    name: yup.string().required(),
    typeId: yup.number().required(),
  })
  .required()

export type FormValues = yup.InferType<typeof validationSchema>
