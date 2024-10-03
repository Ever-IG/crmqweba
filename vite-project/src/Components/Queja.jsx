import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function NuevaQueja() {
    const [NewComplaint, setNewComplaint] = useState({
        QUE_prioridad: '' ,
        QUE_fecha_queja_queja: '',
        QUE_motivo: '',
        QUE_estado: '',
        QUE_descripcion: ''
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
        if (!NewComplaint.QUE_prioridad || !NewComplaint.QUE_motivo) {
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
                QUE_prioridad: '' ,
                QUE_fecha_queja_queja: '',
                QUE_motivo: '',
                QUE_estado: '',
                QUE_descripcion: ''
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
            <div className="col-md-6">
            <div className="form-group mb-3">
                <label htmlFor="QUE_prioridad" className="form-label">PRIORIDAD</label>
                <input
                    type="text"
                    className="form-control"
                    name="QUE_prioridad"
                    value={NewComplaint.QUE_prioridad}
                    onChange={handleChange}
                />
            </div>
            </div>

            <div className="col-md-6">
            <div className="form-group mb-3">
                <label htmlFor="QUE_fecha_queja" className="form-label">FECHA</label>
                <input
                    type="text"
                    className="form-control"
                    name="QUE_fecha_queja"
                    value={NewComplaint.QUE_fecha_queja}
                    onChange={handleChange}
                />
            </div>
            </div>

            <div className="col-md-5">
            <div className="form-group mb-3">
                <label htmlFor="QUE_estado" className="form-label">ESTADO</label>
                <input
                    type="text"
                    className="form-control"
                    name="QUE_estado"
                    value={NewComplaint.QUE_estado}
                    onChange={handleChange}
                />
            </div>
            </div>

            <div className="col-md-8">
            <div className="form-group mb-3">
                <label htmlFor="QUE_motivo" className="form-label">MOTIVO</label>
                <input
                    type="email"
                    className="form-control"
                    name="QUE_motivo"
                    value={NewComplaint.QUE_motivo}
                    onChange={handleChange}
                />
            </div>
            </div>

            <div className="col-md-3">
            <div className="form-group mb-3">
                <label htmlFor="QUE_descripcion" className="form-label">DESCRIPCION</label>
                <input
                    type="text"
                    className="form-control"
                    name="QUE_descripcion"
                    value={NewComplaint.QUE_descripcion}
                    onChange={handleChange}
                />
            </div>
            </div>
            <ToastContainer />
        </form>
        </div>
        </div>
    );
}

export default NuevaQueja;