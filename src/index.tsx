import { Global } from '@emotion/react'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import store from '#models/store'
import globalStyles from '#styles/global'
import theme from '#styles/theme'
import App from '#views'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Global styles={globalStyles} />
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
  document.querySelector('#root'),
)
