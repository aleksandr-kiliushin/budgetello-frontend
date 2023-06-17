import { z } from "zod"

export enum FieldName {
  Password = "password",
  PasswordConfirmation = "passwordConfirmation",
  Username = "username",
}

export const validationSchema = z.object({
  [FieldName.Password]: z.string().nonempty(),
  [FieldName.PasswordConfirmation]: z.string().nonempty(),
  [FieldName.Username]: z.string().nonempty(),
})

export type TFormValidValues = z.infer<typeof validationSchema>

export type TFormDefaultValues = TFormValidValues

export const defaultValues: TFormDefaultValues = {
  [FieldName.Password]: "",
  [FieldName.PasswordConfirmation]: "",
  [FieldName.Username]: "",
}
