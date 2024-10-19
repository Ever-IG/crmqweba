import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function ModalQueja({ show, handleClose, queja, handleUpdate }) {
    // Estado local para los datos del formulario
    const [formData, setFormData] = useState({
            quE_id: '',
            usU_id: '',
            quE_prioridad: '',
            quE_fecha_queja: '', 
            quE_motivo: '',
            quE_estado: '',
            quE_descripcion: ''
    });

    // Actualizar el formData cuando cambie el queja seleccionado
    useEffect(() => {
        if (queja) {
            setFormData({
                quE_id: queja.quE_id,
                usU_id: queja.usU_id,
                quE_prioridad: queja.quE_prioridad,
                quE_fecha_queja: queja.quE_fecha_queja, 
                quE_motivo: queja.quE_motivo,
                quE_estado: queja.quE_estado,
                quE_descripcion: queja.quE_descripcion

            });
        }
    }, [queja]);

    // Manejar los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Enviar los datos actualizados al backend usando PUT
            const response = await fetch(`https://localhost:7228/api/Queja/${queja.quE_id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al agregar la queja');
            }

            // Manejar respuesta según código de estado
            if (response.status !== 204) {
                const updatedqueja = await response.json(); // Solo analiza si no es 204
                handleUpdate(queja.quE_id, updatedqueja);
            } else {
                handleUpdate(queja.quE_id, formData);
            }

            // Notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'queja agregada correctamente',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location.reload();
              }, 600);

        } catch (error) {
            // Manejar errores y mostrar una alerta
            console.error('Error al agregar la queja:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar la queja',
                text: error.message,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar queja</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clI_nombre"> 
                        <Form.Label>CLIENTE</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_nombre"
                            value={formData.clI_nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="quE_prioridad" className="mt-3">
                        <Form.Label>PRIORIDAD</Form.Label>
                        <Form.Control
                            type="text"
                            name="quE_prioridad"
                            value={formData.quE_prioridad}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="quE_fecha_queja" className="mt-3">
                        <Form.Label>FECHA</Form.Label>
                        <Form.Control
                            type="text"
                            name="quE_fecha_queja"
                            value={formData.quE_fecha_queja}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="quE_motivo" className="mt-3">
                        <Form.Label>MOTIVO</Form.Label>
                        <Form.Control
                            type="text"
                            name="quE_motivo"
                            value={formData.quE_motivo}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="quE_estado" className="mt-3">
                        <Form.Label>ESTADO</Form.Label>
                        <Form.Control
                            type="text"
                            name="quE_estado"
                            value={formData.quE_estado}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="quE_descripcion" className="mt-3">
                        <Form.Label>DESCRIPCIÓN</Form.Label>
                        <Form.Control
                            type="text"
                            name="quE_descripcion"
                            value={formData.quE_descripcion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="secondary" onClick={handleClose} className="me-2">
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            Guardar Cambios
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default ModalQueja;
