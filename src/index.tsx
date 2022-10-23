import { ApolloProvider } from "@apollo/client"
import { Global } from "@emotion/react"
import { ThemeProvider } from "@mui/material"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { store } from "#models/store"
import { globalStyles } from "#styles/global"
import { theme } from "#styles/theme"
import { apolloClient } from "#utils/apolloClient"
import { App } from "#views/index"

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
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Global styles={globalStyles} />
            <App />
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </StrictMode>
)
