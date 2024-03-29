/// <reference types="cypress" />
import { TTestUser, credentialsByTestUserId } from "../constants/test-users"

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
    interface Chainable {
      authorize(testUserId: TTestUser["id"]): Promise<void>
    }
  }
}

Cypress.Commands.add("authorize", async (testUserId) => {
  const testUserCredentials = credentialsByTestUserId[testUserId]
  const authorizationResponse = await fetch("http://localhost:3080/graphql", {
    body: JSON.stringify({
      query: `
        mutation CREATE_AUTHORIZATION_TOKEN {
          createAuthorizationToken(input: { username: "${testUserCredentials.username}", password: "${testUserCredentials.password}" })
        }
      `,
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
  })
  const authorizationResponseBody = await authorizationResponse.json()
  const authorizationToken = authorizationResponseBody.data.createAuthorizationToken
  if (typeof authorizationToken !== "string") {
    throw new Error(`
      Authorization failed for the following credentials:
      Username: "${testUserCredentials.username}", password: "${testUserCredentials.password}".
    `)
  }
  localStorage.authorizationToken = authorizationToken
})
