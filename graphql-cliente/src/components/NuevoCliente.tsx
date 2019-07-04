import React, { useState, Fragment } from 'react';
import { NUEVO_CLIENTE } from '../mutations';
import { Mutation } from 'react-apollo';

interface iEmail {
    email: string
}

interface Cliente {
    nombre: String,
    apellido: String,
    empresa: String,
    edad: Number,
    emails: Array<iEmail>,
    tipo: String
}

const NuevoCliente = (props: { history: any; }) => {
    const defaultCliente: Cliente  = {
        nombre: '',
        apellido: '',
        edad: 0,
        empresa: '',
        tipo: '',
        emails: []
    }

    const [ cliente, setCliente ] = useState(defaultCliente);
    const [ error, setError ] = useState(false);
    const [ emails, setEmails ] = useState<Array<iEmail>>([]);

    const nuevoCampo = () => {
        setEmails(emails.concat({email: ''}));
    }

    const removeEmail = (i: number) => {
        setEmails(emails.filter((email, index) => (i !== index)));
    }

    let errorMsje = error ? <p className='alert alert-danger p-3 text-center'>Todos los campos son obligatorios</p> : '';
    
    return (<Fragment>
        {errorMsje}

        <h2 className="text-center">Nuevo Cliente</h2>
        <div className="row justify-content-center">
            <Mutation mutation={NUEVO_CLIENTE}
                onCompleted={() => (props.history.push('/'))}
            >
                { (crearCliente: any) => (
                    <form 
                        className="col-md-8 m-3"
                        onSubmit={ e => {
                            e.preventDefault();
                            
                            const input = {
                                ...cliente,
                                emails
                            };

                            if (input.nombre === '' || input.apellido === '' || input.empresa === '' || input.edad === 0) {
                                setError(true);
                                return;
                            }
                            setError(false);
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
                            <div className="form-group col-md-12">
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
                            {emails.map((input, index) => (
                                <div key={index} className="form-group col-md-12">
                                    <label>Correo {index + 1}:</label>
                                    <div className='input-group'>
                                        <input
                                            placeholder='Email'
                                            type='Email'
                                            className='form-control'
                                            onChange={e => {
                                                const newEmails = emails.map((email, i) => {
                                                    if(index !== i) return email;
                                                    return {
                                                        ...email,
                                                        email: e.target.value
                                                    };
                                                })
                                                setEmails(newEmails);
                                            }}
                                            value={input.email}
                                        />
                                        <div className='input-group-append'>
                                            <button
                                                onClick={() => removeEmail(index)}
                                                type='button'
                                                className='btn btn-danger'
                                            >
                                                &times; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="form-group d-flex justify-content-center col-md-12">
                                <button type='button'
                                    className='btn btn-warning'
                                    onClick={nuevoCampo}
                                >
                                    +Agregar Email
                                </button>
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
                        <button type="submit" className="btn btn-success float-right">
                            Agregar cliente
                        </button>
                    </form>
                )}
            </Mutation>
        </div>
    </Fragment>);
};

export default NuevoCliente;