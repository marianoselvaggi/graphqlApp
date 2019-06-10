import React from 'react';
import { Query } from 'react-apollo';
import { CLIENTES_QUERY } from '../queries';

interface Data {
    id: string;
    nombre: string;
    apellido: string;
    empresa: string;
};

const Clientes = () =>(
    <Query<Data> query={CLIENTES_QUERY}>
        {({ loading, error, data }) => {
            if (loading) return 'cargando...'
            if (error) return `Error: ${error.message}`
            console.log(data);

            return (
                <h2 className="text-center">Listado Clientes</h2>
            )
        }} 
    </Query>
);

export default Clientes;