import React, { useState, useEffect } from "react";
import { Button, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";

const EditarServicio = ({ servicio, handleCloseModal }) => {
  const [formData, setFormData] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");


useEffect(() => {
  if (servicio) {
    setNombre(servicio.seR_nombre);
    setDescripcion(servicio.seR_descripcion);
    setPrecio(servicio.seR_precio);
  }
}, [servicio]);


const handleUpdate = (event) => {
  event.preventDefault();
  const data = {
      seR_nombre: nombre,
      seR_descripcion: descripcion,
      seR_precio: precio,
  };

  fetch(`https://localhost:7228/api/Servicio/${servicio.seR_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('Error al actualizar el servicio');
      }
      Swal.fire({
        title: "Éxito!",
        text: "Seguimiento Actualizado Correctamente!",
        icon: "success",
        willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
        }
    }).then(() => {
        handleCloseModal(); // Cerrar el modal después de actualizar
    });
}).catch((error) => {
    console.error('Error al actualizar el seguimiento:', error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifica los datos e intenta de nuevo!",
      willOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = '3000';
      }
  });
});
};


  return (
    <form className="row g-4" onSubmit={handleUpdate}>
      <div className="col-md-12">
        <TextField 
          label="Nombre del Servicio"
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          fullWidth
          required
        />
      </div>
      <div className="col-md-12">
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(event) => setDescripcion(event.target.value)}
          fullWidth
        />
      </div>
      <div className="col-md-12">
        <TextField
          label="Precio"
          type="number"
          value={precio}
          onChange={(event) => setPrecio(event.target.value)}
          fullWidth
          required
          inputProps={{
            step: "0.01", 
            min: 0,       
          }}
        />
      </div>

      <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleCloseModal}>Cancelar</button>
            </div>
    </form>

  );
};

export default EditarServicio;
