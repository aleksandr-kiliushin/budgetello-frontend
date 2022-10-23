import { Button, Typography } from "@mui/material"
import React from "react"

import { useGetUserQuery } from "#api/users"
import { userActions } from "#models/user"
import { apolloClient } from "#utils/apolloClient"
import { useAppDispatch } from "#utils/hooks"

import { Container } from "./components"

export const Logout: React.FC = () => {
  const dispatch = useAppDispatch()

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (!getAuthorizedUserResult.data) return null

  const onLogout = (): void => {
    dispatch(userActions.logOut())
    apolloClient.resetStore()
  }

  return (
    <Container>
      <Typography textAlign="center">
        You are logged in as <b>{getAuthorizedUserResult.data.user.username}</b>.
      </Typography>
      <Button onClick={onLogout} size="large" variant="outlined">
        Log out
      </Button>
    </Container>
  )
}
