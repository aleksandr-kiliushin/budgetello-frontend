import { ApolloProvider } from "@apollo/client"
import { Global } from "@emotion/react"
import { ThemeProvider } from "@mui/material"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { globalStyles } from "#styles/globalStyles"
import { theme } from "#styles/theme"
import { apolloClient } from "#utils/apolloClient"
import { App } from "#views/index"

const standalonePwaHeaderBackgroundColorMetaTag = document.head.querySelector("meta[name='theme-color']")
if (standalonePwaHeaderBackgroundColorMetaTag instanceof HTMLMetaElement) {
  standalonePwaHeaderBackgroundColorMetaTag.content = theme.palette.background.default
}

let rootNode = document.querySelector("#root")
if (rootNode === null) {
  rootNode = document.createElement("div")
  rootNode.setAttribute("id", "root")
  document.body.append(rootNode)
}

const root = createRoot(rootNode)

root.render(
  <StrictMode>
    <BrowserRouter>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
)
