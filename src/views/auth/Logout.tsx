import { DarkModeSharp as DarkModeSharpIcon } from "@mui/icons-material"
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
        Hello, <b>{getAuthorizedUserResult.data.user.username}</b>.
      </Typography>
      <Button startIcon={<DarkModeSharpIcon />} variant="outlined">
        Switch theme
      </Button>
      <Button color="error" onClick={onLogout} variant="outlined">
        Log out
      </Button>
    </Container>
  )
}
