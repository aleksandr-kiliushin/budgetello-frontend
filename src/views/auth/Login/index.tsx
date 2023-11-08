import { zodResolver } from "@hookform/resolvers/zod"
import { Button, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { useCreateAuthorizationTokenMutation } from "#api/authorization/index.generated"
import { GetUserDocument } from "#api/users/index.generated"
import { RowGroup } from "#components/RowGroup"
import { apolloClient } from "#utils/apolloClient"

import { Container } from "../components"
import { FieldName, TFormDefaultValues, TFormValidValues, defaultValues, validationSchema } from "./form-helpers"

export const Login: FC = () => {
  const navigate = useNavigate()
  const [createAuthorizationToken] = useCreateAuthorizationTokenMutation()

  const {
    formState: { isValid, errors },
    handleSubmit,
    register,
    setError,
  } = useForm<TFormDefaultValues, void, TFormValidValues>({
    defaultValues,
    mode: "onChange",
    resolver: zodResolver(validationSchema),
  })

  const onSubmit = handleSubmit(async ({ password, username }) => {
    try {
      localStorage.removeItem("authorizationToken")
      const response = await createAuthorizationToken({ variables: { password, username } })
      if (response.errors !== undefined) throw response.errors
      if (!response.data) return
      const authorizationToken = response.data.createAuthorizationToken
      if (authorizationToken === undefined) {
        return
      }
      localStorage.authorizationToken = authorizationToken
      await apolloClient.query({
        query: GetUserDocument,
        variables: { id: 0 },
      })
      navigate("/boards")
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorFields = (error as any).graphQLErrors[0].extensions.exception.response.fields

      Object.entries(errorFields).forEach(([fieldName, error]) => {
        setError(fieldName as FieldName, { type: "custom", message: error as string })
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
            {...register(FieldName.Username)}
            error={errors.username !== undefined}
            helperText={errors.username?.message}
            label="Username"
          />
          <TextField
            {...register(FieldName.Password)}
            error={errors.password !== undefined}
            helperText={errors.password?.message}
            label="Password"
            type="password"
          />
          <Button disabled={!isValid} sx={{ width: "auto" }} type="submit" variant="contained">
            Log in
          </Button>
          <Button component={Link} role="button" sx={{ width: "auto" }} to="/registration" variant="outlined">
            Registration
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}
