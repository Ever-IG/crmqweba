import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NuevoProveedor() {
    const [newProveedor, setNewProveedor] = useState({
        PRO_nombre: '',
        PRO_apellido: '',
        PRO_nit: '',
        PRO_telefono: '',
        PRO_correo_electronico: '',
        PRO_direccion: '',
        PRO_departamento: '',
        PRO_municipio: '',
        PRO_codigo_postal: '',
        PRO_pais: '',
        PRO_nombre_empresa: ''
    });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewProveedor({
            ...newProveedor,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación del proveedor
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!newProveedor.PRO_nombre_empresa || !newProveedor.PRO_correo_electronico) {
            toast.error('Nombre de la empresa y correo son obligatorios', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Crear nuevo proveedor
        fetch('https://localhost:7228/api/Proveedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProveedor)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el proveedor');
            }
            return response.json();
        })
        .then(data => {
            setNewProveedor({
                PRO_nombre: '',
                PRO_apellido: '',
                PRO_nit: '',
                PRO_telefono: '',
                PRO_correo_electronico: '',
                PRO_direccion: '',
                PRO_departamento: '',
                PRO_municipio: '',
                PRO_codigo_postal: '',
                PRO_pais: '',
                PRO_nombre_empresa: ''
            });
            toast.success('Proveedor agregado correctamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        })
        .catch(error => console.error('Error adding provider:', error));
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="mb-4">Agregar Proveedor</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label htmlFor="PRO_nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_nombre"
                        name="PRO_nombre"
                        placeholder="Nombre"
                        value={newProveedor.PRO_nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_apellido"
                        name="PRO_apellido"
                        placeholder="Apellido"
                        value={newProveedor.PRO_apellido}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_nombre_empresa">Nombre de la Empresa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_nombre_empresa"
                        name="PRO_nombre_empresa"
                        placeholder="Nombre de la Empresa"
                        value={newProveedor.PRO_nombre_empresa}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_nit">NIT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_nit"
                        name="PRO_nit"
                        placeholder="NIT"
                        value={newProveedor.PRO_nit}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_telefono">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_telefono"
                        name="PRO_telefono"
                        placeholder="Teléfono"
                        value={newProveedor.PRO_telefono}
                        onChange={handleChange}
                        pattern="[0-9]{8}"
                        title="Número de teléfono de 8 dígitos"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_correo_electronico">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="PRO_correo_electronico"
                        name="PRO_correo_electronico"
                        placeholder="Correo Electrónico"
                        value={newProveedor.PRO_correo_electronico}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_direccion">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_direccion"
                        name="PRO_direccion"
                        placeholder="Dirección"
                        value={newProveedor.PRO_direccion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_departamento">Departamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_departamento"
                        name="PRO_departamento"
                        placeholder="Departamento"
                        value={newProveedor.PRO_departamento}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_municipio">Municipio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_municipio"
                        name="PRO_municipio"
                        placeholder="Municipio"
                        value={newProveedor.PRO_municipio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_codigo_postal">Código Postal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_codigo_postal"
                        name="PRO_codigo_postal"
                        placeholder="Código Postal"
                        value={newProveedor.PRO_codigo_postal}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="PRO_pais">País</label>
                    <input
                        type="text"
                        className="form-control"
                        id="PRO_pais"
                        name="PRO_pais"
                        placeholder="País"
                        value={newProveedor.PRO_pais}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Agregar Proveedor</button>
                <ToastContainer />
            </form>
        </div>
    );
}

export default NuevoProveedor;