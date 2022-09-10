import * as yup from "yup"

export enum FormFieldName {
  Password = "password",
  Username = "username",
}

export const validationSchema = yup
  .object({
    [FormFieldName.Password]: yup.string().required(),
    [FormFieldName.Username]: yup.string().required(),
  })
  .required()

export const defaultValues: FormValues = {
  password: "",
  username: "",
}

export type FormValues = yup.InferType<typeof validationSchema>
