import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import RowGroup from '#components/RowGroup'
import { logIn, logOut } from '#models/user'
import { useAppDispatch, useAppSelector } from '#utils/hooks'

import { Container } from './components'
import { FormField, FormValues } from './form-helpers'

const Auth: FC = () => {
  const dispatch = useAppDispatch()

  const { isUserLoggedIn, userData } = useAppSelector((state) => state.user)

  const {
    formState: { isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({ mode: 'onChange' })

  const onSubmit = handleSubmit(({ password, username }) => {
    dispatch(logIn({ password, username }))
  })

  const onLogout = (): void => {
    dispatch(logOut())
  }

  if (isUserLoggedIn) {
    return (
      <Container>
        <Typography textAlign="center">
          You are logged in as <b>{userData.username}</b>.
        </Typography>
        <Button onClick={onLogout} size="large" variant="outlined">
          Log out
        </Button>
      </Container>
    )
  }

  return (
    <Container>
      <Typography textAlign="center" variant="h1">
        Welcome
      </Typography>
      <form onSubmit={onSubmit}>
        <RowGroup>
          <TextField label="Username" {...register(FormField.Username, { required: true })} />
          <TextField
            label="Password"
            type="password"
            {...register(FormField.Password, { required: true })}
          />
          <Button disabled={!isValid} size="large" type="submit" variant="contained">
            Log in
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}

export default Auth
