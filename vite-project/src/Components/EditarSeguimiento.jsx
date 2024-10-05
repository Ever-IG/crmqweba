import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

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

    const today = dayjs().format('YYYY-MM-DD');

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
            usU_id: 1, // Este ID lo puedes modificar según tu lógica
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
        <form className="row g-3" onSubmit={handleUpdate}>
            <div className="col-md-6">
                <label className="form-label">Número de Seguimiento</label>
                <input
                    type="text"
                    className="form-control"
                    value={numeroSeguimiento}
                    readOnly
                />
            </div>
            <div className="col-md-6"></div>
            <div className="col-md-4">
                <label className="form-label">Tipo de Cliente</label>
                <select
                    className="form-select"
                    value={opcionSeleccionada}
                    onChange={(e) => setOpcionSeleccionada(e.target.value)}
                    disabled // Aquí deshabilitamos el campo de tipo de cliente para que no se pueda modificar
                >
                    <option value="clientes">Clientes</option>
                    <option value="posiblesClientes">Posibles Clientes</option>
                </select>
            </div>

            <div className="col-md-8">
                <label className="form-label">Selecciona</label>
                <select
                    className="form-select"
                    name="clienteSeleccionado"
                    value={clienteSeleccionado || ''}
                    onChange={(e) => setClienteSeleccionado(e.target.value)}
                    disabled={!opcionSeleccionada}
                >
                    <option value="">Seleccione un {opcionSeleccionada === 'clientes' ? 'Cliente' : 'Posible Cliente'}</option>
                    {lista.map((item) => (
                        <option
                            key={opcionSeleccionada === 'clientes' ? item.clI_id : item.poC_id}
                            value={opcionSeleccionada === 'clientes' ? item.clI_id : item.poC_id}
                        >
                            {opcionSeleccionada === 'clientes' ? item.clI_nombre : item.poC_nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="col-md-6">
                <label className="form-label">Tipo de Seguimiento</label>
                <select className="form-select" value={tipoSeguimiento} onChange={(e) => setTipoSeguimiento(e.target.value)} required>
                    <option value="llamada">Llamada</option>
                    <option value="correo">Correo</option>
                    <option value="visita">Visita</option>
                </select>
            </div>

            <div className="col-md-6">
                <label className="form-label">Fecha de Seguimiento</label>
                <input type="date" 
                className="form-control" 
                value={fechaSeguimiento} 
                onChange={(e) => setFechaSeguimiento(e.target.value)} 
                max={today}
                 />
            </div>

            <div className="col-12">
                <label className="form-label">Asunto</label>
                <textarea className="form-control" value={asunto} onChange={(e) => setAsunto(e.target.value)} rows="2"></textarea>
            </div>

            <div className="col-md-12">
                <label className="form-label">Propósito de la Llamada</label>
                <input type="text" className="form-control" value={proposito} onChange={(e) => setProposito(e.target.value)} />
            </div>

            <div className="col-md-12">
                <label className="form-label">Resultado</label>
                <input type="text" className="form-control" value={resultado} onChange={(e) => setResultado(e.target.value)} />
            </div>

            <div className="col-12">
                <label className="form-label">Comentario</label>
                <textarea className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} rows="4" ></textarea>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">Actualizar</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleCloseModal}>Cancelar</button>
            </div>
        </form>
    );
};

export default EditarSeguimiento;
