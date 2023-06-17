import * as yup from "yup"

export enum FieldName {
  Password = "password",
  Username = "username",
}

export const validationSchema = yup
  .object({
    [FieldName.Password]: yup.string().required(),
    [FieldName.Username]: yup.string().required(),
  })
  .required()

export const defaultValues: TFormValues = {
  password: "",
  username: "",
}

export type TFormValues = yup.InferType<typeof validationSchema>
