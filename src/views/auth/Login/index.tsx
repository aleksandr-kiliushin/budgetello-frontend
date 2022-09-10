import { yupResolver } from "@hookform/resolvers/yup"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { FC } from "react"
import { useForm } from "react-hook-form"

import RowGroup from "#components/RowGroup"
import { login } from "#models/user"
import { useAppDispatch } from "#utils/hooks"

import { Container } from "../components"
import { FormFieldName, FormValues, defaultValues, validationSchema } from "./form-helpers"

const Login: FC = () => {
  const dispatch = useAppDispatch()

  const {
    formState: { isValid },
    handleSubmit,
    register,
  } = useForm<FormValues>({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = handleSubmit(({ password, username }) => {
    dispatch(login({ password, username }))
  })

  return (
    <Container>
      <Typography textAlign="center" variant="h1">
        Welcome
      </Typography>
      <form onSubmit={onSubmit}>
        <RowGroup>
          <TextField label="Username" {...register(FormFieldName.Username)} />
          <TextField label="Password" type="password" {...register(FormFieldName.Password)} />
          <Button disabled={!isValid} size="large" type="submit" variant="contained">
            Log in
          </Button>
        </RowGroup>
      </form>
    </Container>
  )
}

export default Login
