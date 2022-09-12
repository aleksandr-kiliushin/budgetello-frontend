import { css } from "@emotion/react"
import { FC, useEffect } from "react"
import { Routes } from "react-router"
import { Route } from "react-router-dom"

import Navbar from "#components/Navbar"
import { fetchAndSetLoggedInUser } from "#models/user"
import { mediaQuery } from "#styles/media-queries"
import { useAppDispatch, useAppSelector } from "#utils/hooks"
import Auth from "#views/auth"
import Home from "#views/home"
import Records from "#views/records"
import Settings from "#views/settings"
import Stats from "#views/stats"

const App: FC = () => {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchAndSetLoggedInUser())
  }, [])

  if (user.isLoggedIn === undefined) return <p>Loading ...</p>

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

export default App
