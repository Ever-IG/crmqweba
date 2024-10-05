import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
//import dayjs from 'dayjs';

const dateFormat = 'DD-MM-YYYY'; // Formato de fecha dd-MM-yyyy

function NuevaQueja() {
    const [NewComplaint, setNewComplaint] = useState({
        quE_prioridad: '' ,
        quE_fecha_queja: '',
        quE_motivo: '',
        quE_estado: '',
        quE_descripcion: ''
    });

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewComplaint({
            ...NewComplaint,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación del queja
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!NewComplaint.quE_prioridad || !NewComplaint.quE_motivo) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Nombre y correo electrónico son campos obligatorios!",
              });
            return; 
        }
        
        
    const quejaConValoresPorDefecto = {
        ...NewComplaint,
        CVE_id: NewComplaint.CVE_id || 1, 
    };

    console.log('Datos a enviar:', quejaConValoresPorDefecto);

        // Crear nuevo queja
        fetch('https://localhost:7228/api/Queja', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quejaConValoresPorDefecto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar la queja');
            }
            return response.json();
        })
        .then(data => {
            setNewComplaint({
                quE_prioridad: '' ,
                quE_fecha_queja: '',
                quE_motivo: '',
                quE_estado: '',
                quE_descripcion: ''
                
            });
            Swal.fire({
                title: "Excelente!",
                text: "queja agregado correctamente!",
                icon: "success"
              });
        })
        .catch(error => {
            console.error('Error al agregar el queja:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ocurrió un error al agregar la queja!"
              });
        });
    };

    

    return (
        <div className="NuevaQueja">
        <div className="form-container">
        <form className="row g-3" onSubmit={handleSubmit}>
            
        <center><label> <h3> AGREGAR NUEVA QUEJA </h3> </label> </center>
            {/* Formulario con campos */}
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
                <label htmlFor="quE_estado" className="form-label">ESTADO</label>
                <select
                            className="form-control"
                            name="quE_estado"
                            value={NewComplaint.quE_estado}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona un estado</option>
                            <option value="En progreso">En progreso</option>
                            <option value="Cerrada">Cerrada</option>
                            <option value="Escalada">Escalada</option>
                        </select>
            </div>
            </div>

            <div className="col-md-4">
    <div className="form-group mb-3">
        <label htmlFor="quE_fecha" className="form-label">Fecha</label>
        <input
            type="date"
            className="form-control"
            name="quE_fecha_queja"
            value={NewComplaint.quE_fecha_queja}
            onChange={handleChange}
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
                            <option value="A">Atencion al cliente</option>
                            <option value="D">Disatisfaccion con producto</option>
                            <option value="D">Desacuerdo con resolucion</option>
                            <option value="D">Disatisfaccion con tiempos de entrega</option>
                            <option value="D">Disatisfaccion por servicio</option>
                            <option value="D">Disatisfaccion con producto</option>
                            <option value="D">Discriminacion</option>
                            <option value="D">Experiencia pobre con representante</option>
                            <option value="N">No escalado cuando solicito</option>
                            <option value="L">Lenguaje abusivo o maltrato</option>
                            <option value="T">Tiempo en espera</option>
                        </select>
            </div>
            </div>

            <div className="col-md-12 ">
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

            <div className="col sm-12">
            <div className="form-group mb-3">
                <button type="submit" className="btn btn-primary" 
                style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}>
                    AGREGAR QUEJA
                </button>
            </div>
            </div>
            <ToastContainer />
        </form>
        </div>
        </div>
    );
}

export default NuevaQueja;