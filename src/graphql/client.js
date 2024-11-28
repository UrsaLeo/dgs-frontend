import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://your-graphql-endpoint", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});

export default client;
