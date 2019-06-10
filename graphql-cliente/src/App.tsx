import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Header from './components/header';
import Clientes from './components/clientes';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({networkError, graphQLErrors}) => {
    console.log('grapqlErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Clientes />
    </ApolloProvider>
  );
}

export default App;
