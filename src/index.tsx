import { Global } from "@emotion/react"
import ThemeProvider from "@mui/material/styles/ThemeProvider"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import { store } from "#models/store"
import { globalStyles } from "#styles/global"
import { theme } from "#styles/theme"
import { App } from "#views"

let container = document.querySelector("#root")
if (container === null) {
  container = document.createElement("div")
  container.setAttribute("id", "root")
  document.body.append(container)
}

const root = createRoot(container)

root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
)
