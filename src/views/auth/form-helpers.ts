import { IUser } from '#interfaces/user'

export enum FormField {
  Password = 'password',
  Username = 'username',
}

export type FormValues = Pick<IUser, FormField.Password | FormField.Username>
