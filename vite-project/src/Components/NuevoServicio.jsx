import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function NuevoServicio() {
    const [newServicio, setNewServicio] = useState({
        SER_nombre: '',
        SER_descripcion: '',
        SER_precio: ''
    });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewServicio({
            ...newServicio,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación del servicio
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!newServicio.SER_nombre || !newServicio.SER_precio) {
            toast.error('Nombre del servicio y precio son obligatorios', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        // Crear nuevo servicio
        fetch('https://localhost:7228/api/Servicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newServicio)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el servicio');
            }
            return response.json();
        })
        .then(data => {
            setNewServicio({ SER_nombre: '', SER_descripcion: '', SER_precio: '' });
            toast.success('Servicio agregado correctamente!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        })
        .catch(error => {
            console.error('Error al agregar el servicio:', error);
            toast.error('Ocurrió un error al agregar el servicio', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    return (
            <div className="NuevoCliente">
            <div className="form-container">
            <form className="row g-3" onSubmit= {handleSubmit}>
                <center><label> <h3> AGREGAR NUEVO SERVICIO </h3> </label> </center>
                <div className="col-md-8">
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="mb-4">Agregar Servicio</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label htmlFor="SER_nombre">Nombre del Servicio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="SER_nombre"
                        name="SER_nombre"
                        placeholder="Nombre del Servicio"
                        value={newServicio.SER_nombre}
                        onChange={handleChange}
                        pattern="^[A-Za-z\s]+$"  
                        title="El nombre solo debe contener letras mayúsculas, minúsculas y espacios"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="SER_descripcion">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="SER_descripcion"
                        name="SER_descripcion"
                        placeholder="Descripción"
                        value={newServicio.SER_descripcion}
                        onChange={handleChange}
                         pattern="^[A-Za-z\s]+$"  
                        title="El nombre solo debe contener letras mayúsculas, minúsculas y espacios"
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="SER_precio">Precio</label>
                    <input
                        type="number"
                        className="form-control"
                        id="SER_precio"
                        name="SER_precio"
                        placeholder="Precio"
                        value={newServicio.SER_precio}
                        onChange={handleChange}
                        step="0.000001" // Limitar a 6 decimales
                        min="0"  // No permitir números negativos
                        max="10000"
                        title="El precio debe ser un número positivo con hasta 6 decimales"
                        required
                    />
                </div>
                </div>
                <div className="col md-10">
                <button type="submit" className="btn btn-primary">Agregar Servicio</button>
                </div>
            </form>
        </div>
    );
}

export default NuevoServicio;