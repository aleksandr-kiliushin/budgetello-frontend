import { DarkModeSharp as DarkModeSharpIcon } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import React from "react"

import { useGetUserQuery } from "#api/users"
import { apolloClient } from "#utils/apolloClient"

import { Container } from "./components"

export const Logout: React.FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (!getAuthorizedUserResult.data) return null

  const logout = () => {
    localStorage.removeItem("authorizationToken")
    apolloClient.resetStore()
  }

  const switchColorMode = () => {
    localStorage.colorMode = localStorage.colorMode === "dark" ? "light" : "dark"
    window.location.reload()
  }

  return (
    <Container>
      <Typography textAlign="center">
        Hello, <b>{getAuthorizedUserResult.data.user.username}</b>.
      </Typography>
      <Button onClick={switchColorMode} startIcon={<DarkModeSharpIcon />} variant="outlined" />
      <Button color="error" onClick={logout} variant="outlined">
        Log out
      </Button>
    </Container>
  )
}
