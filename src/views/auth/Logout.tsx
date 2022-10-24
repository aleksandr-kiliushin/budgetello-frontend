import { Button, Typography } from "@mui/material"
import React from "react"

import { useGetUserQuery } from "#api/users"
import { apolloClient } from "#utils/apolloClient"

import { Container } from "./components"

export const Logout: React.FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (!getAuthorizedUserResult.data) return null

  const onLogout = (): void => {
    localStorage.removeItem("authorizationToken")
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
