import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import {
    TextField,
    MenuItem,
    Button,
    Select,
    FormControl,
    InputLabel,
  } from "@mui/material";

const EditarSeguimiento = ({ seguimiento, handleCloseModal }) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [lista, setLista] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    // Estados para controlar los campos del formulario
    const [tipoSeguimiento, setTipoSeguimiento] = useState('');
    const [fechaSeguimiento, setFechaSeguimiento] = useState('');
    const [asunto, setAsunto] = useState('');
    const [proposito, setProposito] = useState('');
    const [resultado, setResultado] = useState('');
    const [comentario, setComentario] = useState('');
    const [numeroSeguimiento, setNumeroSeguimiento] = useState('');
    const [usuarios, setUsuarios] = useState([]); // Nueva lista de usuarios
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState("");

    const today = dayjs().format('YYYY-MM-DD');


    const obtenerUsuarios = async () => {
        try {
          const response = await fetch("https://localhost:7228/api/Usuario");
          const data = await response.json();
          setUsuarios(data); // Guardamos la lista de usuarios
        } catch (error) {
          console.error("Error al obtener los usuarios:", error);
        }
      };

      
    const obtenerClientes = () => {
        fetch('https://localhost:7228/api/Cliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                return response.json();
            })
            .then(data => setLista(data))
            .catch(error => console.error('Error fetching clients:', error));
    };

    const obtenerPosiblesClientes = () => {
        fetch('https://localhost:7228/api/PosibleCliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los Posibles Clientes');
                }
                return response.json();
            })
            .then(data => setLista(data))
            .catch(error => console.error('Error fetching prospects:', error));
    };

    useEffect(() => {
        obtenerUsuarios();
    }, []);
    // Cargar datos del seguimiento cuando el componente se monte
    useEffect(() => {
        if (seguimiento) {
            setOpcionSeleccionada(seguimiento.clI_id ? 'clientes' : 'posiblesClientes');
            setClienteSeleccionado(seguimiento.clI_id || seguimiento.poC_id);
            setTipoSeguimiento(seguimiento.seG_tipo_seguimiento);
            setFechaSeguimiento(dayjs(seguimiento.seG_fecha_seguimiento).format('YYYY-MM-DD'));
            setAsunto(seguimiento.seG_asunto);
            setProposito(seguimiento.seG_proposito_llamada);
            setResultado(seguimiento.seG_resultado);
            setComentario(seguimiento.seG_comentario);
            setNumeroSeguimiento(seguimiento.seG_numero_seguimiento);
            setUsuarioSeleccionado(seguimiento.usU_id);
        }
    }, [seguimiento]);

    useEffect(() => {
        if (opcionSeleccionada === 'clientes') {
            obtenerClientes();
        } else if (opcionSeleccionada === 'posiblesClientes') {
            obtenerPosiblesClientes();
        }
    }, [opcionSeleccionada]);

    const handleUpdate = (event) => {
        event.preventDefault();
        const data = {
            usU_id: usuarioSeleccionado, // Este ID lo puedes modificar según tu lógica
            clI_id: opcionSeleccionada === 'clientes' ? clienteSeleccionado : null,
            poC_id: opcionSeleccionada === 'posiblesClientes' ? clienteSeleccionado : null,
            seG_tipo_seguimiento: tipoSeguimiento,
            seG_fecha_seguimiento: dayjs(fechaSeguimiento).toISOString(),
            seG_asunto: asunto,
            seG_proposito_llamada: proposito,
            seG_resultado: resultado,
            seG_comentario: comentario,
            seG_numero_seguimiento: numeroSeguimiento,
        };

        // Actualización del seguimiento existente
        fetch(`https://localhost:7228/api/Seguimiento/${seguimiento.seG_id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el seguimiento');
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
            })
            .catch((error) => {
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
            <div className="col-md-6">
                <TextField
                    label="Número de Seguimiento"
                    fullWidth
                    value={numeroSeguimiento}
                    onChange={(e) => setNumeroSeguimiento(e.target.value)}
                    required
                    disabled
                />
            </div>

            <div className="col-md-6">
        <TextField
          label="Usuario"
          fullWidth
          select
          value={usuarioSeleccionado}
          onChange={(e) => setUsuarioSeleccionado(e.target.value)}
          required
        >
          {usuarios.map((usuario) => (
            <MenuItem key={usuario.usU_id} value={usuario.usU_id}>
              {usuario.usU_nombre}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="col-md-4">
        <TextField
            label="Tipo de Cliente"
            fullWidth
            value={opcionSeleccionada}
            onChange={(e) => setOpcionSeleccionada(e.target.value)}
            InputProps={{ readOnly: true }}
        >
            <MenuItem value="clientes">Clientes</MenuItem>
            <MenuItem value="posiblesClientes">Posibles Clientes</MenuItem>
        </TextField>
        </div>

           <div className="col-md-8">
                <TextField
                    label={`Selecciona un ${opcionSeleccionada === 'clientes' ? 'Cliente' : 'Posible Cliente'}`}
                    fullWidth
                    select
                    value={clienteSeleccionado || ''}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    disabled={!opcionSeleccionada}
                >
                    {lista.map((item) => (
                        <MenuItem
                            key={opcionSeleccionada === 'clientes' ? item.clI_id : item.poC_id}
                            value={opcionSeleccionada === 'clientes' ? item.clI_id : item.poC_id}
                        >
                            {opcionSeleccionada === 'clientes' ? item.clI_nombre : item.poC_nombre}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
                    <div className="col-md-6">
                        <TextField 
                            label="Tipo de Seguimiento"
                            fullWidth
                            select
                            value={tipoSeguimiento}
                            onChange={(e) => setTipoSeguimiento(e.target.value)}
                            required
                        >
                            <MenuItem value="llamada">Llamada</MenuItem>
                            <MenuItem value="correo">Correo</MenuItem>
                            <MenuItem value="visita">Visita</MenuItem>
                        </TextField>
                    </div>

                    <div className="col-md-6">
                        <TextField
                            label="Fecha de Seguimiento"
                            fullWidth
                            type="date"
                            value={fechaSeguimiento}
                            onChange={(e) => setFechaSeguimiento(e.target.value)}
                            InputLabelProps={{ shrink: true }}
          inputProps={{ max: today }}
                            required
                        />
                    </div>

                    <div className="col-12">
                        <TextField
                            label="Asunto"
                            fullWidth
                            value={asunto}
                            onChange={(e) => setAsunto(e.target.value)}
                            required
                            multiline
                            rows={2}
                        />
                    </div>

                    <div className="col-md-12">
                        <TextField
                            label="Propósito del Seguimiento"
                            fullWidth
                            select
                            value={proposito}
                            onChange={(e) => setProposito(e.target.value)}
                            required
                        >
                            <MenuItem value="Atención al cliente">Atención al cliente</MenuItem>
                            <MenuItem value="Fidelización">Fidelización</MenuItem>
                            <MenuItem value="Venta adicional (Up-selling)">Venta adicional (Up-selling)</MenuItem>
                            <MenuItem value="Venta cruzada (Cross-selling)">Venta cruzada (Cross-selling)</MenuItem>
                            <MenuItem value="Seguimiento post-venta">Seguimiento post-venta</MenuItem>
                            <MenuItem value="Renovación de contratos o servicios">Renovación de contratos o servicios</MenuItem>
                            <MenuItem value="Reactivación de clientes inactivos">Reactivación de clientes inactivos</MenuItem>
                            <MenuItem value="Recoger feedback">Recoger feedback</MenuItem>
                            <MenuItem value="Confirmación de eventos, citas o reprogramación">Confirmación de eventos, citas o reprogramación</MenuItem>
                        </TextField>
                    </div>

                    <div className="col-md-12">
                        <TextField
                            label="Resultado"
                            fullWidth
                            select
                            value={resultado}
                            onChange={(e) => setResultado(e.target.value)}
                            required
                        >
                            <MenuItem value="No respondió">No respondió</MenuItem>
                            <MenuItem value="Respondió">Respondió</MenuItem>
                            <MenuItem value="Reprogramación">Reprogramación</MenuItem>
                            <MenuItem value="Negociación de condiciones">Negociación de condiciones</MenuItem>
                            <MenuItem value="Solicitud de más información">Solicitud de más información</MenuItem>
                            <MenuItem value="Otro">Otro</MenuItem>
                        </TextField>
                    </div>
                    <div className="col-12">
                <TextField
                    label="Comentario"
                    fullWidth
                    value={comentario}
                    onChange={(e) => setComentario(e.target.value)}
                    multiline
                    rows={4}
                />
            </div>
            
            <div className="col-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleCloseModal}>Cancelar</button>
            </div>
        </form>
    );
};

export default EditarSeguimiento;
