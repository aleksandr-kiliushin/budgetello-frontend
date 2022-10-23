import { Button, Typography } from "@mui/material"
import React from "react"

import { userActions } from "#models/user"
import { apolloClient } from "#utils/apolloClient"
import { useAppDispatch, useAppSelector } from "#utils/hooks"

import { Container } from "./components"

export const Logout: React.FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)

  const onLogout = (): void => {
    dispatch(userActions.logOut())
    apolloClient.resetStore()
  }

  return (
    <Container>
      <Typography textAlign="center">
        You are logged in as <b>{user.data.username}</b>.
      </Typography>
      <Button onClick={onLogout} size="large" variant="outlined">
        Log out
      </Button>
    </Container>
  )
}
