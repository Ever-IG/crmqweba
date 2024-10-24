import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, Box, Typography, FormControl } from '@mui/material';

const NuevoServicio = ({
  servicio,
  handleCloseModal,
  isEditMode,
  refreshServicios,
}) => {
    const [nombre, setNombre] = useState("");
    const [descripcion , setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");

    useEffect(() => {
        if (isEditMode && servicio) {
            setNombre(servicio.seR_nombre);
            setDescripcion(servicio.seR_descripcion);
            setPrecio(servicio.seR_precio);
        }
    }, [isEditMode, servicio]);

    const onFinish = async (event) => {
    event.preventDefault();

    const data = {
        seR_nombre: nombre,
        seR_descripcion: descripcion,
        seR_precio: precio,
    };

    const url = isEditMode
        ? `https://localhost:7228/api/Servicio/${servicio.seR_id}`
        : 'https://localhost:7228/api/Servicio';

    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })

    .then((response) => {
        if (!response.ok) {
            throw new Error('Error al enviar el servicio');
        }
        return response.json();
    })
    .then(() => {
        Swal.fire({
            title: '¡Éxito!',
            text: isEditMode
            ? 'Servicio actualizado correctamente.'
            : 'Servicio agregado correctamente.',
            icon: 'success',
            willOpen: () => {
                document.querySelector('.swal2-container').style.zIndex = '3000';
            },
        }).then(() => {
            handleCloseModal();
            refreshServicios();
    });
})
.catch((error) => {
    console.error('Error al enviar el servicio:', error);
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica los datos e intenta de nuevo.',
        willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
        },
    });
});
};


  return (
    <form className="row g-3" onSubmit={onFinish}>
      <div className="col-md-12">
        <TextField
            label="Nombre del Servicio"
            name="seR_nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            fullWidth
            required
            />
      </div>
      <div className="col-md-12">
        <TextField
            label="Descripción"
            name="seR_descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            fullWidth
            multiline
            rows={3}
            />
        </div>

        <div className="col-md-12">
            <TextField
            label="Precio"
            type="number"
            name="seR_precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            inputProps={{ min: 0, step: 0.01 }}
            fullWidth
            required
            />
        </div>
        <div className="col-12 d-flex justify-content-end">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="me-2"
        >
          {isEditMode ? "Actualizar" : "Guardar"}
        </Button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
      </div>
      </form>
  );
};
export default NuevoServicio;
