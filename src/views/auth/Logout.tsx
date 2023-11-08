import { DarkModeSharp as DarkModeSharpIcon } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { FC } from "react"

import { useGetUserQuery } from "#api/users/index.generated"
import { apolloClient } from "#utils/apolloClient"

import { Container } from "./components"

export const Logout: FC = () => {
  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  const user = getAuthorizedUserResult.data?.user

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
        Hello, <b>{user?.username}</b>.
      </Typography>
      <Button onClick={switchColorMode} startIcon={<DarkModeSharpIcon />} variant="outlined">
        Switch mode
      </Button>
      <Button color="error" onClick={logout} variant="outlined">
        Log out
      </Button>
    </Container>
  )
}
