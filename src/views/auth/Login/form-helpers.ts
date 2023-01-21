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

export const defaultValues: FormValues = {
  password: "",
  username: "",
}

export type FormValues = yup.InferType<typeof validationSchema>
