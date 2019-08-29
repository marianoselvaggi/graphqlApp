import React, { Fragment } from 'react';
import FormularioEditarProducto from './formularioEditarProducto';
import { Query } from 'react-apollo';
import { PRODUCTO_QUERY } from '../../queries'

interface Producto {
    id: string,
    nombre: string,
    precio: number,
    stock: number
}

interface Data {
    getProducto: Producto
};

const EditarProducto = (props: any) => {
    const { id } = props.match.params;
    return (<Query<Data> query={PRODUCTO_QUERY} variables={{id}}>
        {({ loading, error, data, refetch }) => {
            if (loading) return 'cargando...';
            if (error) return `Error: ${error.message}`;
            
            const { id, nombre, precio, stock } = data!.getProducto;
            
            return (
                <Fragment>
                    <h2 className="text-center">Editar Producto</h2>   
                    <FormularioEditarProducto producto={{id, nombre, precio, stock}} refetch={refetch} history={props.history} />
                </Fragment>
            );
        }}
    </Query>)
};

export default EditarProducto;