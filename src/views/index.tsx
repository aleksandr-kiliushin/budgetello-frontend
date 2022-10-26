import { Box, Typography, css } from "@mui/material"
import React from "react"
import { Routes } from "react-router"
import { Navigate, Route, useLocation } from "react-router-dom"

import { useGetUserQuery } from "#api/users"
import { Navbar } from "#components/Navbar"
import { Auth } from "#views/auth"
import { BoardRecords } from "#views/boards/BoardRecords"
import { BoardSettings } from "#views/boards/BoardSettings"
import { BoardsList } from "#views/boards/BoardsList"
import { Home } from "#views/home"

export const App: React.FC = () => {
  const location = useLocation()

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (getAuthorizedUserResult.loading) return <Typography>Loading ...</Typography>

  if (getAuthorizedUserResult.error !== undefined && location.pathname !== "/auth") {
    return <Navigate to="/auth" />
  }

  return (
    <>
      <Box component="main">
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Auth />} path="/auth" />
          <Route element={<BoardsList />} path="/boards" />
          <Route element={<BoardRecords />} path="/boards/:boardId/records" />
          <Route element={<BoardSettings />} path="/boards/:boardId/settings" />
        </Routes>
      </Box>
      <Navbar />
    </>
  )
}
