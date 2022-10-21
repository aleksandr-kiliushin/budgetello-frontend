import { ITestUser, credentialsByTestUserId } from "./test-users"

export const getAuthToken = async (testUserId: ITestUser["id"]): Promise<string> => {
  const testUserCredentials = credentialsByTestUserId[testUserId]
  const authorizationResponse = await fetch("http://localhost:3080/graphql", {
    body: JSON.stringify({
      query: `mutation CREATE_AUTHORIZATION_TOKEN {
        createAuthorizationToken(input: { username: "${testUserCredentials.username}", password: "${testUserCredentials.password}" })
      }`,
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
    throw new Error(`Authorization failed for the following credentials.
Username: [${testUserCredentials.username}], password: [${testUserCredentials.password}].
`)
  }
  return authorizationToken
}
