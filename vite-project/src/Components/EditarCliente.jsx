import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EditarCliente({ show, handleClose, cliente, handleUpdate }) {
    // Estado local para los datos del formulario
    const [formData, setFormData] = useState({
        clI_nombre: '',
        clI_apellido: '',
        clI_empresa: '',
        clI_nit: '',
        clI_dpi: '',
        clI_correo_electronico: '',
        clI_telefono: '',
        clI_correo_electronico_secundario: '',
        clI_telefono_secundario: '',
        clI_direccion: '',
        clI_departamento: '',
        clI_municipio: '',
        clI_codigo_postal: '',
        clI_pais: '',
        clI_imagenurl: ''
    });

    // Actualizar el formData cuando cambie el cliente seleccionado
    useEffect(() => {
        if (cliente) {
            setFormData({
                clI_nombre: cliente.clI_nombre,
                clI_apellido: cliente.clI_apellido,
                clI_empresa: cliente.clI_empresa,
                clI_nit: cliente.clI_nit,
                clI_dpi: cliente.clI_dpi,
                clI_correo_electronico: cliente.clI_correo_electronico,
                clI_telefono: cliente.clI_telefono,
                clI_correo_electronico_secundario: cliente.clI_correo_electronico_secundario,
                clI_telefono_secundario: cliente.clI_telefono_secundario,
                clI_direccion: cliente.clI_direccion,
                clI_departamento: cliente.clI_departamento,
                clI_municipio: cliente.clI_municipio,
                clI_codigo_postal: cliente.clI_codigo_postal,
                clI_pais: cliente.clI_pais,
                clI_imagenurl: cliente.clI_imagenurl

            });
        }
    }, [cliente]);

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
            const response = await fetch(`https://localhost:7228/api/Cliente/${cliente.clI_id}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el cliente');
            }

            // Manejar respuesta según código de estado
            if (response.status !== 204) {
                const updatedCliente = await response.json(); // Solo analiza si no es 204
                handleUpdate(cliente.clI_id, updatedCliente);
            } else {
                handleUpdate(cliente.clI_id, formData);
            }

            // Notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'Cliente actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            });

            setTimeout(() => {
                window.location.reload();
              }, 600);

        } catch (error) {
            // Manejar errores y mostrar una alerta
            console.error('Error al actualizar el cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el cliente',
                text: error.message,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="clI_nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_nombre"
                            value={formData.clI_nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_apellido" className="mt-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_apellido"
                            value={formData.clI_apellido}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_empresa" className="mt-3">
                        <Form.Label>Empresa</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_empresa"
                            value={formData.clI_empresa}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_nit" className="mt-3">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_nit"
                            value={formData.clI_nit}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_dpi" className="mt-3">
                        <Form.Label>DPI</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_dpi"
                            value={formData.clI_dpi}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_correo_electronico" className="mt-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="clI_correo_electronico"
                            value={formData.clI_correo_electronico}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_telefono" className="mt-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_telefono"
                            value={formData.clI_telefono}
                            onChange={handleChange}
                            pattern="[0-9]{8}"
                            title="Número de teléfono de 8 dígitos"
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_correo_electronico_secundario" className="mt-3">
                        <Form.Label>Correo Electrónico Secundario</Form.Label>
                        <Form.Control
                            type="email"
                            name="clI_correo_electronico_secundario"
                            value={formData.clI_correo_electronico_secundario}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_telefono_secundario" className="mt-3">
                        <Form.Label>Teléfono Secundario</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_telefono_secundario"
                            value={formData.clI_telefono_secundario}
                            onChange={handleChange}
                            pattern="[0-9]{8}"
                            title="Número de teléfono de 8 dígitos"
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_direccion" className="mt-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_direccion"
                            value={formData.clI_direccion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_departamento" className="mt-3">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_departamento"
                            value={formData.clI_departamento}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_municipio" className="mt-3">
                        <Form.Label>Municipio</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_municipio"
                            value={formData.clI_municipio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_codigo_postal" className="mt-3">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_codigo_postal"
                            value={formData.clI_codigo_postal}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_pais" className="mt-3">
                        <Form.Label>País</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_pais"
                            value={formData.clI_pais}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="clI_imagenurl" className="mt-3">
                        <Form.Label>URL de Imagen</Form.Label>
                        <Form.Control
                            type="text"
                            name="clI_imagenurl"
                            value={formData.clI_imagenurl}
                            onChange={handleChange}
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

export default EditarCliente;
