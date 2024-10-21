import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import VerQueja from './VerQueja';
import {  useNavigate } from 'react-router-dom';

function NuevaQueja() {
    const today = dayjs().format('YYYY-MM-DD');
    
    const [NewComplaint, setNewComplaint] = useState({
        quE_prioridad: '', 
        quE_fecha_queja: today, // Iniciamos con la fecha actual
        quE_motivo: '', 
        quE_estado: '', 
        quE_descripcion: '',
        usU_id: 1,
        clI_id: '' // Este es el campo que almacenar el ID del cliente
    });

    const [clientes, setClientes] = useState([]);

    // Cargar la lista de clientes al montar el componente
    useEffect(() => {
        fetch('https://localhost:7228/api/Cliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar clientes');
                }
                return response.json();
            })
            .then(data => {
                const clientesConNombreCompleto = data.map(cliente => ({
                    ...cliente,
                    nombreCompleto:`${cliente.clI_nombre} ${cliente.clI_apellido}` // Concatenar nombre y apellido
                }));
                setClientes(clientesConNombreCompleto);
            })
            .catch(error => {
                console.error('Error fetching clients:', error);
                toast.error('Error al cargar clientes', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            });
    }, []);

    const handleChange = (e) => {
        setNewComplaint({
            ...NewComplaint,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!NewComplaint.quE_prioridad || !NewComplaint.quE_motivo || !NewComplaint.clI_id) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Cliente, prioridad y motivo son obligatorios!",
                footer: '<a href="#">Why do I have this issue?</a>'
              });
            return;
        }

        fetch('https://localhost:7228/api/Queja', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(NewComplaint)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar la Queja');
            }
            return response.json();
        })
        .then(data => {
            setNewComplaint({ 
                quE_prioridad: '', 
                quE_fecha_queja: today, // Restablecemos la fecha a la fecha actual
                quE_motivo: '', 
                quE_estado: '', 
                quE_descripcion: '',
                usU_id: 1,
                clI_id: '' // Resetear también el ID del cliente
            });
            Swal.fire({
                title: "Success!",
                text: "Se agrego la queja exitosamente!",
                icon: "success"
              });
        })
        .catch(error => {
            console.error('Error al agregar la Queja:', error);
            toast.error('Ocurrió un error al agregar la Queja', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    const handleCancel = () => {
        navigate('/VerQueja'); 
      };

    return (
        <div className="NuevaQueja">
            <div className="form-container">
                <form className="row g-3" onSubmit={handleSubmit}>
                
                    {/* Campo para seleccionar cliente */}
                    <div className="col-md-8">
                        <div className="form-group mb-3">
                            <label htmlFor="clI_id" className="form-label">CLIENTE</label>
                            <select
                                className="form-control"
                                name="clI_id" // Asegúrate de que el nombre aquí coincida con el estado
                                value={NewComplaint.clI_id} // Usa clI_id para almacenar el ID
                                onChange={handleChange}
                            >
                                <option value="">Selecciona un cliente</option>
                                {clientes.map(cliente => (
                                    <option key={cliente.id} value={cliente.clI_id}> {/* Usa el ID correcto aquí */}
                                        {cliente.nombreCompleto} 
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Resto de campos del formulario */}
                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="quE_prioridad" className="form-label">PRIORIDAD</label>
                            <select
                                className="form-control"
                                name="quE_prioridad"
                                value={NewComplaint.quE_prioridad}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona una prioridad</option>
                                <option value="alta">Alta</option>
                                <option value="media">Media</option>
                                <option value="baja">Baja</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="quE_fecha_queja" className="form-label">Fecha</label>
                            <input
                                type="date"
                                className="form-control"
                                name="quE_fecha_queja"
                                value={NewComplaint.quE_fecha_queja} // Enlazamos el estado
                                onChange={handleChange} // El cambio de fecha se maneja en handleChange
                                max={today} // Aquí limitas las fechas al día de hoy o anteriores
                            />
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-group mb-3">
                            <label htmlFor="quE_motivo" className="form-label">MOTIVO</label>
                            <select
                                className="form-control"
                                name="quE_motivo"
                                value={NewComplaint.quE_motivo}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona un motivo</option>
                                <option value="Atencion al cliente">Atencion al cliente</option>
                                <option value="Insatisfaccion con producto">Insatisfaccion con producto</option>
                                <option value="Desacuerdo con resolucion">Desacuerdo con resolucion</option>
                                <option value="Insatisfaccion con tiempos de entrega">Insatisfaccion con tiempos de entrega</option>
                                <option value="Insatisfaccion por servicio">Insatisfaccion por servicio</option>
                                <option value="Discriminacion">Discriminacion</option>
                                <option value="Experiencia pobre con representante">Experiencia pobre con representante</option>
                                <option value="No escalado cuando solicito">No escalado cuando solicito</option>
                                <option value="Lenguaje inapropiado o maltrato">Lenguaje inapropiado o maltrato</option>
                                <option value="Tiempo en espera">Tiempo en espera</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="form-group mb-3">
                            <label htmlFor="quE_estado" className="form-label">ESTADO</label>
                            <select
                                className="form-control"
                                name="quE_estado"
                                value={NewComplaint.quE_estado}
                                onChange={handleChange}
                            >
                                <option value="">Selecciona un estado</option>
                                <option value="Capturada">Capturada</option>
                                <option value="Escalada">Escalada</option>
                                <option value="Cerrada">Cerrada</option>
                                
                            </select>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="form-group mb-3">
                            <label htmlFor="quE_descripcion" className="form-label">DESCRIPCION</label>
                            <input
                                type="text"
                                className="form-control"
                                name="quE_descripcion"
                                value={NewComplaint.quE_descripcion}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="fixed-bottom-button">
                        <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary"
                            style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}>
                            Agregar
                        </button>
                    </div>
                   
                </form>
            </div>
        </div>
    );
}

export default NuevaQueja;