import { css } from "@emotion/react"
import { Box } from "@mui/material"
import React from "react"
import { Routes } from "react-router"
import { Navigate, Route, useLocation } from "react-router-dom"

import { Navbar } from "#components/Navbar"
import { fetchAndSetAuthorizedUser, userActions } from "#models/user"
import { mediaQuery } from "#styles/media-queries"
import { useAppDispatch, useAppSelector } from "#utils/hooks"
import { Auth } from "#views/auth"
import { BoardRecords } from "#views/boards/BoardRecords"
import { BoardSettings } from "#views/boards/BoardSettings"
import { BoardsList } from "#views/boards/BoardsList"
import { Home } from "#views/home"

export const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()

  const user = useAppSelector((state) => state.user)

  React.useEffect(() => {
    dispatch(fetchAndSetAuthorizedUser()).then((isAuthorized) => {
      dispatch(userActions.setIsUserAuthorized(isAuthorized))
    })
  }, [])

  if (user.isAuthorized === false && location.pathname !== "/auth") {
    return <Navigate to="/auth" />
  }

  if (user.isAuthorized === undefined) return <p>Loading ...</p>

  return (
    <Box
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      <Box
        component="main"
        css={css`
          height: calc(100vh - 60px);
          overflow-y: scroll;
          ${mediaQuery.below.sm} {
            height: calc(100vh - 50px);
          }
        `}
      >
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Auth />} path="/auth" />
          <Route element={<BoardsList />} path="/boards" />
          <Route element={<BoardRecords />} path="/boards/:boardId/records" />
          <Route element={<BoardSettings />} path="/boards/:boardId/settings" />
        </Routes>
      </Box>
      <Navbar />
    </Box>
  )
}
