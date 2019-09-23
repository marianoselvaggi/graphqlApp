import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <nav className="mb-4 navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex">
        <div className="container">
            <Link className="navbar-brand text-light font-weight-bold" to="/">
                CRM
            </Link>
            <div className="d-flex mr-4">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuClients"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Productos
                        </button>    
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuClients">
                        <Link to='/productos' className="dropdown-item">
                            Ver Productos
                        </Link>
                        <Link to='/productos/nuevo' className="dropdown-item">
                            Nuevo Producto
                        </Link>
                    </div>
                </div>
                <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuProducts"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Clientes
                    </button>    
                <div className="dropdown-menu" aria-labelledby="dropdownMenuProducts">
                    <Link to='/clientes' className="dropdown-item">
                        Ver Clientes
                    </Link>
                    <Link to='/clientes/nuevo' className="dropdown-item">
                        Nuevo Cliente
                    </Link>
                </div>
            </div>
            </div>
        </div>
    </nav>
);

export default Header;