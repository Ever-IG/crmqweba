import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2'; 

function EditarServicio({ show, handleClose, servicio, handleUpdate }) {
  const [formData, setFormData] = useState({
    seR_nombre: '',
    seR_descripcion: '',
    seR_precio: '',
  });

  // Actualizar el formData cuando cambie el servicio seleccionado
  useEffect(() => {
    if (servicio) {
      setFormData({
        seR_nombre: servicio.seR_nombre,
        seR_descripcion: servicio.seR_descripcion,
        seR_precio: servicio.seR_precio,
      });
    }
  }, [servicio]);

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
      const response = await fetch(`https://localhost:7228/api/Servicio/${servicio.seR_id}`, {
        method: 'PUT',  // O puedes usar PATCH si es una actualización parcial
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Error al actualizar el servicio');
      }
  
      // Si la respuesta es 204, no intentes analizar JSON.
      if (response.status !== 204) {
        const updatedServicio = await response.json(); // Solo analiza si no es 204
        // Llamar la función de actualización de la lista de servicios en el componente padre
        handleUpdate(servicio.seR_id, updatedServicio);
      } else {
        handleUpdate(servicio.seR_id, formData);
      }
  

      Swal.fire({
        icon: 'success',
        title: 'Servicio actualizado correctamente',
        showConfirmButton: false,
        timer: 1500
      });
  
 
    setTimeout(() => {
        window.location.reload();
      }, 600);
  
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      // Mostrar mensaje de error usando SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar el servicio',
        text: error.message,
      });
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Servicio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="seR_nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control 
              type="text" 
              name="seR_nombre" 
              value={formData.seR_nombre} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="seR_descripcion" className="mt-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              type="text" 
              name="seR_descripcion" 
              value={formData.seR_descripcion} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="seR_precio" className="mt-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control 
              type="number" 
              name="seR_precio" 
              value={formData.seR_precio} 
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

export default EditarServicio;
