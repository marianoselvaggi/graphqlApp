import React from 'react';

interface iProps {
    message: string
};

const Exito = (props: iProps) => {
    return (<p className='alert alert-success py-3 text-center'>{props.message}</p>)
};

export default Exito;