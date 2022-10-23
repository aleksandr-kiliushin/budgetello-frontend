import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField, Typography } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"

import { useCreateAuthorizationTokenMutation } from "#api/authorization"
import { RowGroup } from "#components/RowGroup"
import { fetchAndSetAuthorizedUser, userActions } from "#models/user"
import { useAppDispatch } from "#utils/hooks"

import { Container } from "../components"
import { FormField, FormValues, defaultValues, validationSchema } from "./form-helpers"

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()

  const [createAuthToken] = useCreateAuthorizationTokenMutation()

  const {
    formState: { isValid, errors },
    handleSubmit,
    register,
    setError,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = handleSubmit(async ({ password, username }) => {
    try {
      localStorage.removeItem("authToken")
      const response = await createAuthToken({ variables: { password, username } })
      if (response.errors !== undefined) throw errors
      if (response.data === undefined) return
      if (response.data === null) return
      const authorizationToken = response.data.createAuthorizationToken
      if (authorizationToken === undefined) {
        dispatch(userActions.setIsUserAuthorized(false))
        return
      }
      localStorage.authToken = authorizationToken
      dispatch(userActions.setIsUserAuthorized(true))
      await dispatch(fetchAndSetAuthorizedUser())
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FormField, { type: "custom", message: error as string })
      })
    }
  })

  return (
    <Container>
      <Typography textAlign="center" variant="h1">
        Welcome
      </Typography>
      <form onSubmit={onSubmit}>
        <RowGroup>
          <TextField
            {...register(FormField.Username)}
            error={errors.username !== undefined}
            helperText={errors.username?.message}
            label="Username"
          />
          <TextField
            {...register(FormField.Password)}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            label="Password"
            type="password"
          />
          <Button disabled={!isValid} size="large" type="submit" variant="contained">
            Log in
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}
