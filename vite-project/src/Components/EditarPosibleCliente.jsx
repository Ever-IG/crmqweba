import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EditarPosibleCliente({ show, handleClose, posiblecliente, handleUpdate }) {
    // Estado local para los datos del formulario
    const [formData, setFormData] = useState({
        poC_nombre: '',
        poC_apellido: '',
        poC_empresa: '',
        poC_nit: '',
        poC_dpi: '',
        poC_correo_electronico: '',
        poC_telefono: '',
        poC_fuente_de_posible_cliente: '',
        poC_estado_de_posible_cliente: '',
        poC_correo_electronico_secundario: '',
        poC_telefono_secundario: '',
        poC_direccion: '',
        poC_departamento: '',
        poC_municipio: '',
        poC_codigo_postal: '',
        poC_pais: '',
        poC_imagenurl: '',
        CVE_id: ''
    });

    // Actualizar el formData cuando cambie el cliente seleccionado
    useEffect(() => {
        if (posiblecliente) {
            setFormData({
                poC_nombre: posiblecliente.poC_nombre,
                poC_apellido: posiblecliente.poC_apellido,
                poC_empresa: posiblecliente.poC_empresa,
                poC_nit: posiblecliente.poC_nit,
                poC_dpi: posiblecliente.poC_dpi,
                poC_correo_electronico: posiblecliente.poC_correo_electronico,
                poC_telefono: posiblecliente.poC_telefono,
                poC_fuente_de_posible_cliente: posiblecliente.poC_fuente_de_posible_cliente,
                poC_estado_de_posible_cliente: posiblecliente.poC_estado_de_posible_cliente,
                poC_correo_electronico_secundario: posiblecliente.poC_correo_electronico_secundario,
                poC_telefono_secundario: posiblecliente.poC_telefono_secundario,
                poC_direccion: posiblecliente.poC_direccion,
                poC_departamento: posiblecliente.poC_departamento,
                poC_municipio: posiblecliente.poC_municipio,
                poC_codigo_postal: posiblecliente.poC_codigo_postal,
                poC_pais: posiblecliente.poC_pais,
                poC_imagenurl: posiblecliente.poC_imagenurl,
                CVE_id: posiblecliente.CVE_id

            });
        }
    }, [posiblecliente]);

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
            const response = await fetch(`https://localhost:7228/api/PosibleCliente/${posiblecliente.poC_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el posible cliente');
            }

            // Manejar respuesta según código de estado
            if (response.status !== 204) {
                const updatedPosibleCliente = await response.json(); // Solo analiza si no es 204
                handleUpdate(posiblecliente.poC_id, updatedPosibleCliente);
            } else {
                handleUpdate(posiblecliente.poC_id, formData);
            }

            // Notificación de éxito
            Swal.fire({
                icon: 'success',
                title: 'Posible cliente actualizado correctamente',
                showConfirmButton: false,
                timer: 1500
            });

            // Cerrar el modal
            handleClose();

        } catch (error) {
            // Manejar errores y mostrar una alerta
            console.error('Error al actualizar el posible cliente:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el posible cliente',
                text: error.message,
            });
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Posible Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="poC_nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_nombre"
                            value={formData.poC_nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_apellido" className="mt-3">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_apellido"
                            value={formData.poC_apellido}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_empresa" className="mt-3">
                        <Form.Label>Empresa</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_empresa"
                            value={formData.poC_empresa}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_nit" className="mt-3">
                        <Form.Label>NIT</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_nit"
                            value={formData.poC_nit}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_dpi" className="mt-3">
                        <Form.Label>DPI</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_dpi"
                            value={formData.poC_dpi}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_correo_electronico" className="mt-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="poC_correo_electronico"
                            value={formData.poC_correo_electronico}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_telefono" className="mt-3">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_telefono"
                            value={formData.poC_telefono}
                            onChange={handleChange}
                            pattern="[0-9]{8}"
                            title="Número de teléfono de 8 dígitos"
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_fuente_de_posible_cliente" className="mt-3">
                        <Form.Label>Fuente de Posible Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_fuente_de_posible_cliente"
                            value={formData.poC_fuente_de_posible_cliente}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_estado_de_posible_cliente" className="mt-3">
                        <Form.Label>Estado de Posible Cliente</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_estado_de_posible_cliente"
                            value={formData.poC_estado_de_posible_cliente}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_correo_electronico_secundario" className="mt-3">
                        <Form.Label>Correo Electrónico Secundario</Form.Label>
                        <Form.Control
                            type="email"
                            name="poC_correo_electronico_secundario"
                            value={formData.poC_correo_electronico_secundario}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_telefono_secundario" className="mt-3">
                        <Form.Label>Teléfono Secundario</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_telefono_secundario"
                            value={formData.poC_telefono_secundario}
                            onChange={handleChange}
                            pattern="[0-9]{8}"
                            title="Número de teléfono de 8 dígitos"
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_direccion" className="mt-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_direccion"
                            value={formData.poC_direccion}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_departamento" className="mt-3">
                        <Form.Label>Departamento</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_departamento"
                            value={formData.poC_departamento}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_municipio" className="mt-3">
                        <Form.Label>Municipio</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_municipio"
                            value={formData.poC_municipio}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_codigo_postal" className="mt-3">
                        <Form.Label>Código Postal</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_codigo_postal"
                            value={formData.poC_codigo_postal}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="poC_pais" className="mt-3">
                        <Form.Label>País</Form.Label>
                        <Form.Control
                            type="text"
                            name="poC_pais"
                            value={formData.poC_pais}
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

export default EditarPosibleCliente;
