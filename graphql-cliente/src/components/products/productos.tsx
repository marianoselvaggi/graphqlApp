import React, { Fragment, useState, useEffect } from 'react';
import { PRODUCTOS_QUERY } from '../../queries';
import { Query, Mutation } from 'react-apollo';
import { BORRAR_PRODUCTO } from '../../mutations';
import { Link } from 'react-router-dom';
import Exito from '../alertas/exito';
import Paginador from '../paginador';

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
    const limite = 2;

    const [ alerta, setAlerta ] = useState({
        mostrar: false,
        message: ''
    });

    const [ paginador, setPaginador ] = useState({
        pagina: 1,
        offset: 0
    });

    const clickAnterior = () => {
        setPaginador({
            pagina: paginador.pagina - 1,
            offset: paginador.offset - limite
        });
    };

    const clickSiguiente = () => {
        setPaginador({
            pagina: paginador.pagina + 1,
            offset: paginador.offset + limite
        });
    };

    useEffect(
        () => {
            if (alerta.mostrar) {
                setTimeout(() => {
                    setAlerta({
                        mostrar: false,
                        message: ''
                    });
                }, 3000);
            }
        }
    );

    return (<Query<Data> query={PRODUCTOS_QUERY} pollInterval={1000} variables={{limite: limite, offset: paginador.offset}}>
        {({ loading, error, data }) => {
              if (loading) return 'cargando...'
              if (error) return `Error: ${error.message}`

              const alert = alerta.mostrar ? <Exito message={alerta.message} /> : '';
              return (
                  <Fragment>
                      {alert}
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
                                        <Mutation mutation={BORRAR_PRODUCTO}
                                            onCompleted={(data: any) => {
                                                setAlerta({
                                                    message: data.borrarProducto,
                                                    mostrar: true
                                                });
                                            }}
                                        >
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
                      <Paginador 
                        actual={paginador.pagina}
                        total={data!.totalProductos}
                        limite={limite}
                        clickAnterior={clickAnterior}
                        clickSiguiente={clickSiguiente}
                      />
                  </Fragment>
              );
        }}
    </Query>)
};


export default Productos;