import React, { Fragment } from 'react';

interface iProps {
    match: any
}

const NuevoPedido = (props: iProps) => {
    const { id } = props.match.params;
    return (
        <Fragment>
            <h1 className="text-center mb-5">`Nuevo Pedido${id}`</h1>

            <div className="row">
                <div className="col-md-3">
                    Client here
                </div>
                <div className="col-md-9">
                    PEdido here
                </div>
                
            </div>

        </Fragment>
    )
};

export default NuevoPedido;