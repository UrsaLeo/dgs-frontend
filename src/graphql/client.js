import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: createHttpLink({
    uri: "/graphql", // Correct GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});

export default client;
