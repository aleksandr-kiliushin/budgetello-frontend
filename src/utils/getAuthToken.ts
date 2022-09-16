import { ITestUserUsername, passwordByUsername } from "#utils/testing/test-users-credentials"

export const getAuthToken = async (username: ITestUserUsername) => {
  const authorizationResponse = await fetch("http://localhost:3080/api/login", {
    body: JSON.stringify({ username, password: passwordByUsername[username] }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  })
  const { authToken } = await authorizationResponse.json()
  if (typeof authToken !== "string") {
    throw new Error(
      `Authorization failed for the following credentials: Username: ${username}, password: ${passwordByUsername[username]}.`
    )
  }
  return authToken
}
