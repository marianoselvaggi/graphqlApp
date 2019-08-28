import React, { Fragment} from 'react';
import { CLIENTE_QUERY } from '../../queries';
import { Query } from 'react-apollo';
import FormularioEditar from './FormularioEditar';

interface Data {
    getCliente: Cliente
};

interface Cliente {
    id: string,
    nombre: string,
    apellido: string,
    empresa: string,
    edad: number,
    emails: Array<{
        email: string
    }>,
    tipo: string
}

const EditarCliente = (props: any) => {
    const { id } = props.match.params;

    return (
        <Fragment>
            <h2 className="text-center">Editar Cliente</h2>
            
            <div className='row justify-content-center'>
                <Query<Data> query={CLIENTE_QUERY} variables={{id}}>
                    {({ loading, error, data, refetch}) => {
                        if (loading) return 'Cargando...';
                        if (error) return `Error ${error.message}`;

                        return (
                            <FormularioEditar
                                cliente={{
                                    id,
                                    nombre: data!.getCliente.nombre,
                                    apellido: data!.getCliente.apellido,
                                    empresa: data!.getCliente.empresa,
                                    edad: data!.getCliente.edad,
                                    emails: data!.getCliente.emails,
                                    tipo: data!.getCliente.tipo
                                }}
                                refetch={refetch}
                            />
                        )
                    }

                    }
                </Query>
            </div>
        </Fragment>
    )
}

export default EditarCliente;