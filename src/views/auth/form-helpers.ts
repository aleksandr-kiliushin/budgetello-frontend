import User from '#types/user'

export enum FormField {
  Password = 'password',
  Username = 'username',
}

export type FormValues = Pick<User, FormField.Password | FormField.Username>
