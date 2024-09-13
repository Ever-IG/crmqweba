import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function NuevoCliente() {
    const [newCliente, setNewCliente] = useState({
        CLI_nombre: '',
        CLI_apellido: '',
        CLI_empresa: '',
        CLI_nit: '',
        CLI_dpi: '',
        CLI_correo_electronico: '',
        CLI_telefono: '',
        CLI_correo_electronico_secundario: '',
        CLI_telefono_secundario: '',
        CLI_direccion: '',
        CLI_departamento: '',
        CLI_municipio: '',
        CLI_codigo_postal: '',
        CLI_pais: '',
        CLI_imagenurl: ''
    });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewCliente({
            ...newCliente,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación del cliente
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!newCliente.CLI_nombre || !newCliente.CLI_correo_electronico) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nombre y correo electrónico son campos obligatorios!",
              });
            return; 
        }
        
        
    const clienteConValoresPorDefecto = {
        ...newCliente,
        CVE_id: newCliente.CVE_id || 1, 
    };

    console.log('Datos a enviar:', clienteConValoresPorDefecto);

        // Crear nuevo cliente
        fetch('https://localhost:7228/api/Cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(clienteConValoresPorDefecto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el cliente');
            }
            return response.json();
        })
        .then(data => {
            setNewCliente({
                CLI_nombre: '',
                CLI_apellido: '',
                CLI_empresa: '',
                CLI_nit: '',
                CLI_dpi: '',
                CLI_correo_electronico: '',
                CLI_telefono: '',
                CLI_correo_electronico_secundario: '',
                CLI_telefono_secundario: '',
                CLI_direccion: '',
                CLI_departamento: '',
                CLI_municipio: '',
                CLI_codigo_postal: '',
                CLI_pais: '',
                CLI_imagenurl: '',
                CVE_id: ''
            });
            Swal.fire({
                title: "Excelente!",
                text: "Cliente agregado correctamente!",
                icon: "success"
              });
        })
        .catch(error => {
            console.error('Error al agregar el cliente:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al agregar el cliente!"
              });
        });
    };

    

    return (
        <div className="NuevoCliente">
        <div className="form-container">
        <form className="row g-3" onSubmit={handleSubmit}>
            {/* Formulario con campos */}
            <div className="col-md-4">
                <label htmlFor="CLI_nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_nombre"
                    value={newCliente.CLI_nombre}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="CLI_apellido" className="form-label">Apellido</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_apellido"
                    value={newCliente.CLI_apellido}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-8">
                <label htmlFor="CLI_empresa" className="form-label">Empresa</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_empresa"
                    value={newCliente.CLI_empresa}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="CLI_nit" className="form-label">NIT</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_nit"
                    value={newCliente.CLI_nit}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="CLI_dpi" className="form-label">DPI</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_dpi"
                    value={newCliente.CLI_dpi}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-8">
                <label htmlFor="CLI_correo_electronico" className="form-label">Correo Electrónico</label>
                <input
                    type="email"
                    className="form-control"
                    name="CLI_correo_electronico"
                    value={newCliente.CLI_correo_electronico}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-8">
                <label htmlFor="CLI_telefono" className="form-label">Teléfono</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_telefono"
                    value={newCliente.CLI_telefono}
                    onChange={handleChange}
                    pattern='/^[0-9]{8}$/'
                    title="Número de teléfono de 8 dígitos"
                />
            </div>
            <div className="col-md-8">
                <label htmlFor="CLI_correo_electronico_secundario" className="form-label">Correo Electrónico Secundario</label>
                <input
                    type="email"
                    className="form-control"
                    name="CLI_correo_electronico_secundario"
                    value={newCliente.CLI_correo_electronico_secundario}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-8">
                <label htmlFor="CLI_telefono_secundario" className="form-label">Teléfono Secundario</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_telefono_secundario"
                    value={newCliente.CLI_telefono_secundario}
                    onChange={handleChange}
                    pattern='/^[0-9]{8}$/'
                    title="Número de teléfono de 8 dígitos"
                />
            </div>
            <div className="col-12">
                <label htmlFor="CLI_didreccion" className="form-label">Dirección</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_direccion"
                    placeholder="Ciudad"
                    value={newCliente.CLI_direccion}
                    onChange={handleChange}
                />
            </div>
            <div className="col-12">
                <label htmlFor="CLI_departamento" className="form-label">Departamento</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_departamento"
                    value={newCliente.CLI_departamento}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="CLI_municipio" className="form-label">Municipio</label>
                <input
                    type="text"
                    className="form-control"
                    name="CLI_municipio"
                    value={newCliente.CLI_municipio}
                    onChange={handleChange}
                />
            </div>
            <div className="col-md-2">
                <label htmlFor="CLI_codigo_postal" className="form-label">Código Postal</label>
                <input
                    type="number"
                    className="form-control"
                    name="CLI_codigo_postal"
                    value={newCliente.CLI_codigo_postal}
                    onChange={handleChange}
                    min="10000"     // Mínimo valor: 5 dígitos
                    max="99999"
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="CLI_pais" className="form-label">País</label>
                <select
                    name="CLI_pais"
                    className="form-select"
                    value={newCliente.CLI_pais}
                    onChange={handleChange}
                >
                    <option defaultValue>Guatemala</option>
                    <option value="GT">Guatemala</option>
                    <option value="MX">México</option>
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Agregar Cliente</button>
            </div>
            <ToastContainer />
        </form>
        </div>
        </div>
    );
}

export default NuevoCliente;
