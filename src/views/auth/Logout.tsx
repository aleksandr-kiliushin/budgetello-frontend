import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { FC } from "react"

import { logOut } from "#models/user"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import { Container } from "./components"

const Logout: FC = () => {
  const dispatch = useAppDispatch()

  const { userData } = useAppSelector((state) => state.user)

  const onLogout = (): void => {
    dispatch(logOut())
  }

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

export default Logout
