import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NuevoPosibleCliente() {
    const [newPosibleCliente, setNewPosibleCliente] = useState({
        POC_nombre: '',
        POC_apellido: '',
        POC_empresa: '',
        POC_nit: '',
        POC_dpi: '',
        POC_correo_electronico: '',
        POC_telefono: '',
        POC_fuente_de_posible_cliente: '',
        POC_estado_de_posible_cliente: '',
        POC_correo_electronico_secundario: '',
        POC_telefono_secundario: '',
        POC_direccion: '',
        POC_departamento: '',
        POC_municipio: '',
        POC_codigo_postal: '',
        POC_pais: '',
        POC_imagenurl: '',
        CVE_id: ''
    });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewPosibleCliente({
            ...newPosibleCliente,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación del posible cliente
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!newPosibleCliente.POC_nombre || !newPosibleCliente.POC_correo_electronico) {
            toast.error('Nombre y correo electrónico son obligatorios', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        const clienteConValoresPorDefecto = {
            ...newPosibleCliente,
            CVE_id: newPosibleCliente.CVE_id || 1,
        };

        console.log('Datos a enviar:', clienteConValoresPorDefecto);

        // Crear nuevo posible cliente
        fetch('https://localhost:7228/api/PosibleCliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteConValoresPorDefecto)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el posible cliente');
                }
                return response.json();
            })
            .then(data => {
                setNewPosibleCliente({
                    POC_nombre: '', POC_apellido: '', POC_empresa: '', POC_nit: '', POC_dpi: '', POC_correo_electronico: '',
                    POC_telefono: '', POC_fuente_de_posible_cliente: '', POC_estado_de_posible_cliente: '',
                    POC_correo_electronico_secundario: '', POC_telefono_secundario: '', POC_direccion: '',
                    POC_departamento: '', POC_municipio: '', POC_codigo_postal: '', POC_pais: '', POC_imagenurl: '', CVE_id: ''
                });
                toast.success('Posible Cliente agregado correctamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(error => console.error('Error adding possible client:', error));
    };

    return (
        
        <div className="NuevoPosibleCliente">
        <div className="form-container">        
            <ToastContainer />
            <center><label> <h3> AGREGAR NUEVO POSIBLE CLIENTE </h3> </label> </center>
            <form onSubmit={handleSubmit} className="row g-3">
                {/* Input fields for all the columns */}
                <div className="col-md-6">
                <div className="form-group mb-3">
                    <label htmlFor="POC_nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_nombre"
                        name="POC_nombre"
                        placeholder="Nombre"
                        value={newPosibleCliente.POC_nombre}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-6">
                <div className="form-group mb-3">
                    <label htmlFor="POC_apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_apellido"
                        name="POC_apellido"
                        placeholder="Apellido"
                        value={newPosibleCliente.POC_apellido}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-8">
                <div className="form-group mb-3">
                    <label htmlFor="POC_empresa">Empresa</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_empresa"
                        name="POC_empresa"
                        placeholder="Empresa"
                        value={newPosibleCliente.POC_empresa}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_nit">NIT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_nit"
                        name="POC_nit"
                        placeholder="NIT"
                        value={newPosibleCliente.POC_nit}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_dpi">DPI</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_dpi"
                        name="POC_dpi"
                        placeholder="DPI"
                        value={newPosibleCliente.POC_dpi}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-8">
                <div className="form-group mb-3">
                    <label htmlFor="POC_correo_electronico">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="POC_correo_electronico"
                        name="POC_correo_electronico"
                        placeholder="Correo Electrónico"
                        value={newPosibleCliente.POC_correo_electronico}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_telefono">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_telefono"
                        name="POC_telefono"
                        placeholder="Teléfono"
                        value={newPosibleCliente.POC_telefono}
                        onChange={handleChange}
                        pattern="[0-9]{8}"
                        title="Número de teléfono de 8 dígitos"
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_fuente_de_posible_cliente">Fuente de Posible Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_fuente_de_posible_cliente"
                        name="POC_fuente_de_posible_cliente"
                        placeholder="Fuente de Posible Cliente"
                        value={newPosibleCliente.POC_fuente_de_posible_cliente}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_estado_de_posible_cliente">Estado de Posible Cliente</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_estado_de_posible_cliente"
                        name="POC_estado_de_posible_cliente"
                        placeholder="Estado de Posible Cliente"
                        value={newPosibleCliente.POC_estado_de_posible_cliente}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-8">
                <div className="form-group mb-3">
                    <label htmlFor="POC_correo_electronico_secundario">Correo Electrónico Secundario</label>
                    <input
                        type="email"
                        className="form-control"
                        id="POC_correo_electronico_secundario"
                        name="POC_correo_electronico_secundario"
                        placeholder="Correo Electrónico Secundario"
                        value={newPosibleCliente.POC_correo_electronico_secundario}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_telefono_secundario">Teléfono Secundario</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_telefono_secundario"
                        name="POC_telefono_secundario"
                        placeholder="Teléfono Secundario"
                        value={newPosibleCliente.POC_telefono_secundario}
                        onChange={handleChange}
                        pattern="[0-9]{8}"
                        title="Número de teléfono de 8 dígitos"
                    />
                </div>
                </div>
                <div className="col-md-8">
                <div className="form-group mb-3">
                    <label htmlFor="POC_direccion">Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_direccion"
                        name="POC_direccion"
                        placeholder="Dirección"
                        value={newPosibleCliente.POC_direccion}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_departamento">Departamento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_departamento"
                        name="POC_departamento"
                        placeholder="Departamento"
                        value={newPosibleCliente.POC_departamento}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_municipio">Municipio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_municipio"
                        name="POC_municipio"
                        placeholder="Municipio"
                        value={newPosibleCliente.POC_municipio}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_codigo_postal">Código Postal</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_codigo_postal"
                        name="POC_codigo_postal"
                        placeholder="Código Postal"
                        value={newPosibleCliente.POC_codigo_postal}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-4">
                <div className="form-group mb-3">
                    <label htmlFor="POC_pais">País</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_pais"
                        name="POC_pais"
                        placeholder="País"
                        value={newPosibleCliente.POC_pais}
                        onChange={handleChange}
                    />
                </div>
                </div>
                <div className="col-md-12">
                <div className="form-group mb-3">
                    <label htmlFor="POC_imagenurl">Imagen URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="POC_imagenurl"
                        name="POC_imagenurl"
                        placeholder="Imagen URL"
                        value={newPosibleCliente.POC_imagenurl}
                        onChange={handleChange}
                    />
                </div></div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-primary">Agregar Posible Cliente</button>
                </div>
            </form>
        </div>
        </div>
    );
}

export default NuevoPosibleCliente;