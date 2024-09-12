import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'; 

function EditarProveedor({ show, handleClose, proveedor, handleUpdate }) {
  const [formData, setFormData] = useState({
    prO_nombre: '',
    prO_apellido: '',
    prO_nit: '',
    prO_telefono: '',
    prO_correo_electronico: '',
    prO_direccion: '',
    prO_departamento: '',
    prO_municipio: '',
    prO_codigo_postal: '',
    prO_pais: '',
    prO_nombre_empresa: ''
  });

  // Actualizar el formData cuando cambie el proveedor seleccionado
  useEffect(() => {
    if (proveedor) {
      setFormData({
        prO_nombre: proveedor.prO_nombre,
        prO_apellido: proveedor.prO_apellido,
        prO_nit: proveedor.prO_nit,
        prO_telefono: proveedor.prO_telefono,
        prO_correo_electronico: proveedor.prO_correo_electronico,
        prO_direccion: proveedor.prO_direccion,
        prO_departamento: proveedor.prO_departamento,
        prO_municipio: proveedor.prO_municipio,
        prO_codigo_postal: proveedor.prO_codigo_postal,
        prO_pais: proveedor.prO_pais,
        prO_nombre_empresa: proveedor.prO_nombre_empresa
      });
    // Remove the extra closing curly brace
  }
 }, [proveedor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Enviar los datos actualizados al backend usando PUT
      const response = await fetch(`https://localhost:7228/api/Proveedor/${proveedor.prO_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el proveedor');
      }
  
      if (response.status !== 204) {
        const updatedProveedor = await response.json();
        handleUpdate(proveedor.prO_id, updatedProveedor);
      } else {
        handleUpdate(proveedor.prO_id, formData);
      }
  
      Swal.fire({
        icon: 'success',
        title: 'Proveedor actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
  
      setTimeout(() => {
        window.location.reload();
      }, 600);
  
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el proveedor',
        text: error.message,
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="prO_nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_nombre" 
              value={formData.prO_nombre} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="prO_apellido" className="mt-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_apellido" 
              value={formData.prO_apellido} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="prO_nit" className="mt-3">
            <Form.Label>NIT</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_nit" 
              value={formData.prO_nit} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="prO_telefono" className="mt-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_telefono" 
              value={formData.prO_telefono} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_correo_electronico" className="mt-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control 
              type="email" 
              name="prO_correo_electronico" 
              value={formData.prO_correo_electronico} 
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="prO_direccion" className="mt-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_direccion" 
              value={formData.prO_direccion} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_departamento" className="mt-3">
            <Form.Label>Departamento</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_departamento" 
              value={formData.prO_departamento} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_municipio" className="mt-3">
            <Form.Label>Municipio</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_municipio" 
              value={formData.prO_municipio} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_codigo_postal" className="mt-3">
            <Form.Label>Código Postal</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_codigo_postal" 
              value={formData.prO_codigo_postal} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_pais" className="mt-3">
            <Form.Label>País</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_pais" 
              value={formData.prO_pais} 
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="prO_nombre_empresa" className="mt-3">
            <Form.Label>Nombre Empresa</Form.Label>
            <Form.Control 
              type="text" 
              name="prO_nombre_empresa" 
              value={formData.prO_nombre_empresa} 
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

export default EditarProveedor;