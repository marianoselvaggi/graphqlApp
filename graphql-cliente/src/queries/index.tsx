import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`
  query getClientes($limite: Int, $offset: Int) {
    getClientes(limite: $limite, offset: $offset) {
      id
      nombre
      apellido
      edad
      empresa
      tipo
      emails {
        email
      }
    }
    totalClientes
  }
`;

export const CLIENTE_QUERY = gql`
  query consultarCliente($id: String) {
    getCliente(id: $id) {
      nombre
      apellido
      edad
      empresa
      tipo
      emails {
        email
      }
    }
  }
`;

export const PRODUCTOS_QUERY = gql`
  query getProductos($limite: Int, $offset: Int) {
    getProductos(limite: $limite,offset: $offset) {
      id
      nombre
      precio
    }
    totalProductos
  }
`;