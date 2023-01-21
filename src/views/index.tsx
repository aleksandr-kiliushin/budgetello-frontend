import { Box } from "@mui/material"
import React from "react"
import { Routes } from "react-router"
import { Navigate, Route, useLocation } from "react-router-dom"

import { useGetUserQuery } from "#api/users"
import { BreadcrumbsPanel } from "#components/BreadcrumbsPanel"
import { Navbar } from "#components/Navbar"
import { Auth } from "#views/auth"
import { BoardRecords } from "#views/boards/BoardRecords"
import { BoardSettings } from "#views/boards/BoardSettings"
import { BoardsList } from "#views/boards/BoardsList"
import { Home } from "#views/home"
import { Registration } from "#views/registration"

export const App: React.FC = () => {
  const location = useLocation()

  const getAuthorizedUserResult = useGetUserQuery({ variables: { id: 0 } })

  if (getAuthorizedUserResult.loading) return null

  if (
    getAuthorizedUserResult.error !== undefined &&
    location.pathname !== "/auth" &&
    location.pathname !== "/registration"
  ) {
    return <Navigate to="/auth" />
  }

  return (
    <>
      <Box component="main">
        <BreadcrumbsPanel />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Auth />} path="/auth" />
          <Route element={<BoardsList />} path="/boards" />
          <Route element={<BoardsList />} path="/boards/create" />
          <Route element={<BoardRecords />} path="/boards/:boardId/records" />
          <Route element={<BoardRecords />} path="/boards/:boardId/records/add" />
          <Route element={<BoardRecords />} path="/boards/:boardId/records/edit/:recordId" />
          <Route element={<BoardSettings />} path="/boards/:boardId/settings" />
          <Route element={<BoardSettings />} path="/boards/:boardId/settings/add-budget-category" />
          <Route
            element={<BoardSettings />}
            path="/boards/:boardId/settings/delete-budget-category/:budgetCategoryId"
          />
          <Route element={<BoardSettings />} path="/boards/:boardId/settings/edit-budget-category/:budgetCategoryId" />
          <Route element={<Registration />} path="/registration" />
        </Routes>
      </Box>
      <Navbar />
    </>
  )
}
