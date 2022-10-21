import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

if (process.env.MODE !== "development" && process.env.MODE !== "production") {
  throw new Error(`
    process.env.MODE has invalid value.
    Allowed values: ['development', 'production'].
    Received: ${process.env.MODE}.
  `)
}

const httpLinkUriByMode = {
  development: "http://localhost:3080/graphql",
  production: "https://personal-application-api.herokuapp.com/graphql",
}

const httpLink = createHttpLink({
  uri: httpLinkUriByMode[process.env.MODE],
})

const authorizationLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.authToken,
    },
  }
})

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: authorizationLink.concat(httpLink),
})
