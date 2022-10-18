import { gql, useMutation } from "@apollo/client"
import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import React from "react"
import { useForm } from "react-hook-form"

import { RowGroup } from "#components/RowGroup"
import { userActions } from "#models/user"
import { apolloClient } from "#src/apolloClient"
import { useAppDispatch } from "#utils/hooks"

import { Container } from "../components"
import { FormFieldName, FormValues, defaultValues, validationSchema } from "./form-helpers"

const AUTHORIZE = gql`
  mutation authorize($username: String!, $password: String!) {
    authorize(input: { username: $username, password: $password })
  }
`

export const Login: React.FC = () => {
  const dispatch = useAppDispatch()

  const [authorize] = useMutation(AUTHORIZE)

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
      const response = await authorize({ variables: { username, password } })
      const authorizationToken = response.data.authorize
      if (authorizationToken === undefined) {
        dispatch(userActions.setIsUserAuthorized(false))
        return
      }
      localStorage.authToken = authorizationToken
      dispatch(userActions.setIsUserAuthorized(true))
      const result = await apolloClient.query({
        query: gql`
          query getUser {
            user(id: 0) {
              id
              username
            }
          }
        `,
      })
      dispatch(userActions.setCurrentUser(result.data.user))
    } catch (error) {
      if (typeof error !== "object") return
      if (error === null) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Object.entries((error as any).fields).forEach(([fieldName, error]) => {
        setError(fieldName as FormFieldName, { type: "custom", message: error as string })
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
            {...register(FormFieldName.Username)}
            error={errors.username !== undefined}
            helperText={errors.username?.message}
            label="Username"
          />
          <TextField
            {...register(FormFieldName.Password)}
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
