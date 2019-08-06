import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';
import { BORRAR_CLIENTE } from '../mutations';
import Paginador from './paginador';

interface Data {
    getClientes: [Cliente],
    totalClientes: number
};

interface Cliente {
    id: string;
    nombre: string;
    apellido: string;
    empresa: string;
}

interface iStateClientes {
    paginador: {
        pagina: number,
        offset: number
    }
}

const Clientes = () => {
    const defaultValues: iStateClientes = {
        paginador: {
            pagina: 1,
            offset: 0
        }
    };
    const [ paginador, setPaginador ] = useState(defaultValues);
    return(<Query<Data> query={CLIENTES_QUERY} pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if (loading) return 'cargando...'
            if (error) return `Error: ${error.message}`
            console.log(data);
            return (
                <Fragment>
                    <h2 className="text-center mb-4">Listado Clientes</h2>
                    <ul className="list-group">
                        {data!.getClientes.map(item => (
                            <li key={item.id} className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        {item.nombre} {item.apellido} {` - ${item.empresa}`}
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Mutation mutation={BORRAR_CLIENTE}>
                                            {(borrarCliente: any) => (
                                                <button type="button" className="btn btn-danger d-block d-md-inline-block mr-2"
                                                    onClick={() => {
                                                        if(window.confirm('Seguro que desea eliminar este registro?')) {
                                                            borrarCliente({
                                                                variables: {
                                                                    id: item.id
                                                                }
                                                            });
                                                        }
                                                    }}>
                                                        
                                                    &times;Eliminar Cliente
                                                </button>
                                            )}
                                        </Mutation>
                                        <Link to={`/cliente/editar/${item.id}`} className="btn btn-success d-block d-md-inline-block">
                                            Editar Cliente
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Paginador
                        actual={paginador.paginador.pagina}
                        total={data!.totalClientes}
                        limite={1}
                    />
                </Fragment>
            )
        }} 
    </Query>);
};

export default Clientes;