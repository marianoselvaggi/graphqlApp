import React, { useState, Fragment } from 'react';

interface iProducto {
    nombre: string,
    precio: number,
    stock: number
}

const NuevoProducto = (props: any) => {

    const defaultProducto: iProducto = {
        nombre: '',
        precio: 0,
        stock: 0
    };

    const [ producto, setProducto ] = useState(defaultProducto);
    const [ error, setError ] = useState(false);

    const updateValues = (e: any) => {
        const { name, value } = e.target;
        
        setProducto({
            ...producto,
            [name]: value
        });
    };

    let errorMsje = error ? <p className='alert alert-danger p-3 text-center'>Todos los campos son obligatorios</p> : '';

    return (
        <Fragment>
            {errorMsje}


            <h2 className="text-center">Nuevo Producto</h2>
            
            <div className="row justify-content-center">
                <form className="col-md-8" onSubmit={e => {
                    e.preventDefault();
                    const { nombre, precio, stock } = producto;
                    if (nombre === '' || !precio || !stock) {
                        setError(true);
                    } else {
                        setError(false);
                    }
                    return;
                }}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name="nombre" 
                            className="form-control" 
                            placeholder="Nombre del Producto"
                            onChange={(e) => updateValues(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Precio:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input 
                                type="number" 
                                name="precio" 
                                className="form-control" 
                                placeholder="Precio del Producto"
                                onChange={(e) => updateValues(e)}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Stock:</label>
                        <input 
                            type="number" 
                            name="stock" 
                            className="form-control" 
                            placeholder="stock del Producto"
                            onChange={(e) => updateValues(e)}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-success float-right">
                            Crear Producto
                    </button>
                </form>
            </div>
        </Fragment>
    )
};

export default NuevoProducto;