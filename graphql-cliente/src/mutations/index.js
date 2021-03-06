import gql from 'graphql-tag';

export const NUEVO_CLIENTE = gql`
mutation crearCliente($input: ClienteInput) {
    crearCliente(input: $input) {
      id
      nombre
      apellido
      edad
    }
}`;

export const ACTUALIZAR_CLIENTE = gql`
mutation actualizarCliente($input: ClienteInput) {
  actualizarCliente (input: $input) {
      id
      nombre
      apellido
      edad
  }
}`;

export const BORRAR_CLIENTE = gql`
mutation borrarCliente($id: ID) {
  borrarCliente (id: $id)
}`;

export const BORRAR_PRODUCTO = gql`
mutation borrarProducto($id: ID) {
  borrarProducto (id: $id)
}`;

export const NUEVO_PRODUCTO =gql`
mutation nuevoProducto ($input: ProductoInput) {
  nuevoProducto(input: $input) {
    id
    nombre
    precio
    stock
  }
}`;

export const ACTUALIZAR_PRODUCTO =gql`
mutation actualizarProducto ($input: ProductoInput) {
  actualizarProducto(input: $input) {
    id
    nombre
    precio
    stock
  }
}`;