import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/layout/header';
import Clientes from './components/clients/clientes';
import NuevoCliente from './components/clients/NuevoCliente';
import EditarCliente from './components/clients/EditarCliente';
import NuevoProducto from './components/products/nuevoProducto';
import EditarProducto from './components/products/editarProducto';
import Productos from './components/products/productos';
import NuevoPedido from './components/pedidos/NuevoPedido';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('grapqlErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/clientes" component={Clientes} />
              <Route exact path="/clientes/nuevo" component={NuevoCliente} />
              <Route exact path="/clientes/editar/:id" component={EditarCliente} />
              <Route exact path="/productos" component={Productos} />
              <Route exact path="/productos/nuevo" component={NuevoProducto} />
              <Route exact path="/productos/editar/:id" component={EditarProducto} />
              <Route exact path="/pedidos/nuevo/:id" component={NuevoPedido} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </ApolloProvider>
  );
}

export default App;
