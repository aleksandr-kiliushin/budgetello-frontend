import { yupResolver } from "@hookform/resolvers/yup"
import { Button, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

import { useCreateUserMutation } from "#api/users"
import { RowGroup } from "#components/RowGroup"

import { Container } from "../auth/components"
import { FieldName, FormValues, defaultValues, validationSchema } from "./form-helpers"

export const Registration: FC = () => {
  const navigate = useNavigate()
  const [createUser] = useCreateUserMutation()

  // TODO: Remove destructuring.
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

  const onSubmit = handleSubmit(async ({ password, passwordConfirmation, username }) => {
    try {
      const result = await createUser({ variables: { password, passwordConfirmation, username } })
      if (result.errors !== undefined) throw errors
      navigate("/auth")
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
        Registration
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
          <TextField
            {...register(FieldName.PasswordConfirmation)}
            error={errors.passwordConfirmation !== undefined}
            helperText={errors.passwordConfirmation?.message}
            label="Confirm password"
            type="password"
          />
          <Button disabled={!isValid} fullWidth sx={{ width: "auto" }} type="submit" variant="contained">
            Register
          </Button>
          <Button component={Link} role="button" sx={{ width: "auto" }} to="/auth" variant="outlined">
            Login
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}
