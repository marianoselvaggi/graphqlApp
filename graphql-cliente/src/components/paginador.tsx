import React, { useState } from 'react';

interface iPropsPaginador {
    actual: number,
    total: number,
    limite: number
}

interface iStatePaginador {
    paginador: {
        paginas: number
    }
}

const Paginador = (props: iPropsPaginador) => {

    const defaultPaginador:iStatePaginador = {
        paginador: {
            paginas: Math.ceil(props.total / props.limite)
        }
    };
    const [ paginador, setPaginador ] = useState(defaultPaginador); 

    const { actual } = props;
    const btnAnterior = (actual > 1) ? <button type="button" className="btn btn-success mr-2">&laquo; Anterior</button> : '';
    const btnSiguiente = (actual !== paginador.paginador.paginas) ? <button type="button" className="btn btn-success mr-2">&raquo; Siguiente</button> : '';

    return (
        <div className='mt-5 d-flex justify-content-center'>
            {btnAnterior}
            {btnSiguiente}
        </div>
    );
}

export default Paginador;