// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')
import { Global } from "@emotion/react"
import { ThemeProvider } from "@mui/material"
import { mount } from "cypress/react18"

import { globalStyles } from "#styles/globalStyles"
import { theme } from "#styles/theme"

import "./commands"

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface Chainable {
      mount: typeof mount
    }
  }
}

Cypress.Commands.add("mount", (component) => {
  mount(
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {component}
    </ThemeProvider>
  )
})
