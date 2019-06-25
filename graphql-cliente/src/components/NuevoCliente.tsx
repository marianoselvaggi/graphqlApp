import React, { useState, Fragment } from 'react';
import { NUEVO_CLIENTE } from '../mutations';
import { Mutation } from 'react-apollo';

interface Cliente {
    nombre: String,
    apellido: String,
    empresa: String,
    edad: Number,
    email: String,
    tipo: String
}

const NuevoCliente = () => {
    const defaultCliente: Cliente  = {
        nombre: '',
        apellido: '',
        edad: 0,
        empresa: '',
        tipo: '',
        email: ''
    }
    const [ cliente, setCliente ] = useState(defaultCliente);
    
    return (<Fragment>
        <h2 className="text-center">Nuevo Cliente</h2>
        <div className="row justify-content-center">
            <Mutation mutation={NUEVO_CLIENTE}>
                { (crearCliente: any) => (
                    <form 
                        className="col-md-8 m-3"
                        onSubmit={ e => {
                            e.preventDefault();
                            const input = {
                                ...cliente
                            };
                            crearCliente({
                                variables: {input}
                            });
                        }}
                    >
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre"
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            nombre: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Apellido"
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            apellido: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Empresa</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Empresa"
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            empresa: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Email</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            email: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Edad</label>
                                <input
                                    type="number"
                                    min="10"
                                    max="100"
                                    className="form-control"
                                    placeholder="Edad"
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            edad: Number(e.target.value),
                                        });
                                    }}
                                />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Tipo Cliente</label>  
                                <select 
                                    onChange={e=>{
                                        setCliente({
                                            ...cliente,
                                            tipo: e.target.value,
                                        });
                                    }}
                                    className="form-control">
                                    <option value="">Elegir...</option>
                                    <option value="PREMIUM">PREMIUM</option>
                                    <option value="BASICO">BÁSICO</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-success float-right">Guardar Cambios</button>
                    </form>
                )}
            </Mutation>
        </div>
    </Fragment>);
};

export default NuevoCliente;