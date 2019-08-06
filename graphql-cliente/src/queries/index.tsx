import gql from 'graphql-tag';

export const CLIENTES_QUERY = gql`{
  getClientes {
    id
    nombre
    apellido
    empresa
  }
  totalClientes
}`;

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