import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FC } from "react"
import { useForm } from "react-hook-form"

import { RowGroup } from "#components/RowGroup"
import { login } from "#models/user"
import { useAppDispatch } from "#utils/hooks"

import { Container } from "../components"
import { FormField, FormValues, defaultValues, validationSchema } from "./form-helpers"

export const Login: FC = () => {
  const dispatch = useAppDispatch()

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
      await dispatch(login({ password, username }))
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
