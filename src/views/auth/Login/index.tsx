import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField, Typography } from "@mui/material"
import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useCreateAuthorizationTokenMutation } from "#api/authorization"
import { GetUserDocument } from "#api/users"
import { RowGroup } from "#components/RowGroup"
import { apolloClient } from "#utils/apolloClient"

import { Container } from "../components"
import { FormField, FormValues, defaultValues, validationSchema } from "./form-helpers"

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const [createAuthorizationToken] = useCreateAuthorizationTokenMutation()

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
      localStorage.removeItem("authorizationToken")
      const result = await createAuthorizationToken({ variables: { password, username } })
      if (result.errors !== undefined) throw errors
      if (!result.data) return
      const authorizationToken = result.data.createAuthorizationToken
      if (authorizationToken === undefined) {
        return
      }
      localStorage.authorizationToken = authorizationToken
      await apolloClient.query({
        query: GetUserDocument,
        variables: { id: 0 },
      })
      setTimeout(() => navigate("/"), 1000)
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
          <Button disabled={!isValid} fullWidth sx={{ width: "auto" }} type="submit" variant="contained">
            Log in
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}
