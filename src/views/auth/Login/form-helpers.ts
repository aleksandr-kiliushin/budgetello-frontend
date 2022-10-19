import * as yup from "yup"

export enum FormField {
  Password = "password",
  Username = "username",
}

export const validationSchema = yup
  .object({
    [FormField.Password]: yup.string().required(),
    [FormField.Username]: yup.string().required(),
  })
  .required()

export const defaultValues: FormValues = {
  password: "",
  username: "",
}

export type FormValues = yup.InferType<typeof validationSchema>
