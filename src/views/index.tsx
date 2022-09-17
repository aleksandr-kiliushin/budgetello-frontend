import { css } from "@emotion/react"
import React from "react"
import { Routes } from "react-router"
import { Navigate, Route, useLocation } from "react-router-dom"

import Navbar from "#components/Navbar"
import { fetchAndSetAuthorizedUser, userActions } from "#models/user"
import { mediaQuery } from "#styles/media-queries"
import { useAppDispatch, useAppSelector } from "#utils/hooks"
import Auth from "#views/auth"
import Home from "#views/home"
import Records from "#views/records"
import Settings from "#views/settings"
import Stats from "#views/stats"

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
    <div
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      <main
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
          <Route element={<Records />} path="/records" />
          <Route element={<Settings />} path="/settings" />
          <Route element={<Stats />} path="/stats" />
        </Routes>
      </main>

      <Navbar />
    </div>
  )
}
