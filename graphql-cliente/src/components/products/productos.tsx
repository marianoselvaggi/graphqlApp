import React, { Fragment } from 'react';
import { PRODUCTOS_QUERY } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import { BORRAR_PRODUCTO } from '../../mutations';
import { Link } from 'react-router-dom';

interface Data {
    getProductos: [Producto],
    totalProductos: number
};

interface Producto {
    id: string;
    nombre: string;
    precio: number;
    stock: number;
}

const Productos = (props: any) => {
    return (<Query<Data> query={PRODUCTOS_QUERY} pollInterval={1000}>
        {({ loading, error, data }) => {
              if (loading) return 'cargando...'
              if (error) return `Error: ${error.message}`

              return (
                  <Fragment>
                      <h2 className="text-center mb-4">Listado Productos</h2>
                      <table className="table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data!.getProductos.map(item => (
                                <tr>
                                    <td>{item.nombre}</td>
                                    <td>{item.precio}</td>
                                    <td>{item.stock}</td>
                                    <td>
                                        <Mutation mutation={BORRAR_PRODUCTO}>
                                            {(borrarProducto: any) => (
                                                <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2"
                                                onClick={() => {
                                                    if(window.confirm('Seguro que desea eliminar este registro?')) {
                                                        borrarProducto({
                                                            variables: {
                                                                id: item.id
                                                            }
                                                        });
                                                    }
                                                }}>
                                                    
                                                &times;Eliminar Producto
                                            </button>
                                            )}
                                        </Mutation>
                                        <Link to={`/productos/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar Producto
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                  </Fragment>
              );
        }}
    </Query>)
};


export default Productos;