import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const dateFormat = "DD-MM-YYYY";

const NuevaQueja = ({ handleCloseModal, refreshQuejas, isEditMode, queja }) => {
  const [clientes, setClientes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [fechaQueja, setFechaQueja] = useState(dayjs().format("YYYY-MM-DD"));
  const [motivo, setMotivo] = useState('');
  const [estado, setEstado] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [prioridad, setPrioridad] = useState('media');
  const [clienteId, setClienteId] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const today = dayjs().format("YYYY-MM-DD");

  useEffect(() => {
    fetchClientes();
    fetchUsuarios();
    if (isEditMode && queja) {
      setFechaQueja(dayjs(queja.quE_fecha_queja).format("YYYY-MM-DD"));
      setMotivo(queja.quE_motivo);
      setEstado(queja.quE_estado);
      setDescripcion(queja.quE_descripcion);
      setPrioridad(queja.quE_prioridad);
      setClienteId(queja.clI_id);
      setUsuarioId(queja.usU_id);
    }
  }, [isEditMode, queja]);


  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedQueja = {
      clI_id: clienteId,
      usU_id: usuarioId,
      quE_fecha_queja: fechaQueja,
      quE_prioridad: prioridad,
      quE_estado: estado,
      quE_motivo: motivo,
      quE_descripcion: descripcion,
    };
    handleUpdate(queja?.quE_id, updatedQueja);
  };

  const fetchClientes = async () => {
    fetch("https://localhost:7228/api/Cliente")
    .then((response) => response.json())
    .then((data) => {
      const clientesConNombreCompleto = data.map((cliente) => ({
        ...cliente,
        nombreCompleto: `${cliente.clI_nombre} ${cliente.clI_apellido}`, // Concatenar nombre y apellido
      }));
      setClientes(clientesConNombreCompleto);
    })
    .catch((error) => console.error("Error fetching clients:", error));
};


  const fetchUsuarios = async () => {
    const response = await fetch('https://localhost:7228/api/Usuario');
    const data = await response.json();
    setUsuarios(data);
  };

  const onFinish = async (event) => {
    event.preventDefault();
  
    const data = {
      clI_id: clienteId,
      usU_id: usuarioId,
      quE_prioridad: prioridad,
      quE_fecha_queja: fechaQueja,
      quE_motivo: motivo,
      quE_estado: estado,
      quE_descripcion: descripcion,
    };
  
    const url = isEditMode
      ? `https://localhost:7228/api/Queja/${queja.quE_id}`
      : 'https://localhost:7228/api/Queja';
  
    const method = isEditMode ? 'PUT' : 'POST';
  
    try {
      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      // No intentamos parsear la respuesta si el código es 204
      if (response.status === 204) {
        Swal.fire({
          title: '¡Éxito!',
          text: 'Queja actualizada correctamente.',
          icon: 'success',
          willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
          },
        }).then(() => {
          handleCloseModal();
          refreshQuejas();
        });
      } else {
        const result = await response.json();
        Swal.fire({
          title: '¡Éxito!',
          text: 'Queja agregada correctamente.',
          icon: 'success',
          willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
          },
        }).then(() => {
          handleCloseModal();
          refreshQuejas();
        });
      }
    } catch (error) {
      console.error('Error al enviar la queja:', error);
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Verifica los datos e intenta de nuevo.',
        willOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = '3000';
        },
      });
    }
  };
  
  return (
    <form className="row g-3" onSubmit={onFinish}>
      <div className="col-md-8">
        <TextField
          label="Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(e.target.value)}
          select
          fullWidth
          required
        >
          {clientes.map((cliente) => (
            <MenuItem key={cliente.clI_id} value={cliente.clI_id}>
              {cliente.nombreCompleto}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="col-md-4">
        <TextField
        label="Agente"
        value={usuarioId}
        onChange={(e) => setUsuarioId(e.target.value)}
        select
        fullWidth
        required
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.usU_id} value={usuario.usU_id}>
              {usuario.usU_nombre}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="col-md-6">
        <TextField
          label="Fecha de Queja"
          type="date"
          value={fechaQueja}
          onChange={(e) => setFechaQueja(e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
          required
        />
      </div>


      <div className="col-md-6">
        <TextField
            label="Prioridad"
            value={prioridad}
            onChange={(e) => setPrioridad(e.target.value)}
            select
            fullWidth
            required
        >
            {['Baja', 'Media', 'Alta'].map((prioridad) => (
            <MenuItem key={prioridad} value={prioridad}>
                {prioridad}
            </MenuItem>
            ))}
        </TextField>
      </div>

      <div className="col-md-6">
        <TextField
            label="Estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            select
            fullWidth
            required
        >
            {['Capturada', 'Escalada', 'Cerrada'].map((estado) => (
            <MenuItem key={estado} value={estado}>
                {estado}
            </MenuItem>
            ))}
        </TextField>
        </div>

      <div className="col-md-6">
        <TextField
          label="Motivo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          select
          fullWidth
          required
        >
          {[
            'Atencion al cliente',
            'Insatisfaccion con producto',
            'Desacuerdo con resolucion',
            'Insatisfaccion con tiempos de entrega',
            'Insatisfaccion por servicio',
            'Discriminacion',
            'Experiencia pobre con representante',
            'No escalado cuando solicito',
            'Lenguaje inapropiado o maltrato',
            'Tiempo en espera',
          ].map((motivo) => (
            <MenuItem key={motivo} value={motivo}>
              {motivo}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="col-md-12">
        <TextField
          label="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
      </div>

      <div className="col-12 d-flex justify-content-end">
        <Button type="submit" variant="contained" color="primary" className="me-2">
          {isEditMode ? 'Actualizar' : 'Guardar'}
        </Button>
        <button type="button" className="btn btn-danger ms-2" onClick={handleCloseModal}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default NuevaQueja;
