import User from '#types/user'

export enum FormFieldName {
  Password = 'password',
  Username = 'username',
}

export interface FormValues {
  [FormFieldName.Password]: User['password']
  [FormFieldName.Username]: User['username']
}
