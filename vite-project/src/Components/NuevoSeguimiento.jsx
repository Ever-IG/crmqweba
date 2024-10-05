import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

const dateFormat = 'DD-MM-YYYY';

const NuevoSeguimiento = ({ seguimiento, handleCloseModal, isEditMode, refreshSeguimientos }) => {
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [lista, setLista] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    // Nuevos estados para controlar los campos del formulario
    const [tipoSeguimiento, setTipoSeguimiento] = useState('');
    const [fechaSeguimiento, setFechaSeguimiento] = useState(dayjs().format('YYYY-MM-DD'));
    const [asunto, setAsunto] = useState('');
    const [proposito, setProposito] = useState('');
    const [resultado, setResultado] = useState('');
    const [comentario, setComentario] = useState('');
    const [numeroSeguimiento, setNumeroSeguimiento] = useState('');

    const today = dayjs().format('YYYY-MM-DD');

    // Efecto para cargar los datos en modo edición o generar un nuevo número de seguimiento en modo creación
    useEffect(() => {
        if (isEditMode && seguimiento) {
            setOpcionSeleccionada(seguimiento.clI_id ? 'clientes' : 'posiblesClientes');
            setClienteSeleccionado(seguimiento.clI_id || seguimiento.poC_id);
            setTipoSeguimiento(seguimiento.seG_tipo_seguimiento);
            setFechaSeguimiento(dayjs(seguimiento.seG_fecha_seguimiento).format('YYYY-MM-DD'));
            setAsunto(seguimiento.seG_asunto);
            setProposito(seguimiento.seG_proposito_llamada);
            setResultado(seguimiento.seG_resultado);
            setComentario(seguimiento.seG_comentario);
            setNumeroSeguimiento(seguimiento.seG_numero_seguimiento);
        } else {
            // Si no es modo edición, generar el número de seguimiento
            generarNumeroSeguimiento().then((numero) => {
                setNumeroSeguimiento(numero);
            });
        }
    }, [isEditMode, seguimiento]);

    const obtenerClientes = () => {
        fetch('https://localhost:7228/api/Cliente')
                .then(response => response.json())
                .then(data => {
                    const clientesConNombreCompleto = data.map(cliente => ({
                        ...cliente,
                        nombreCompleto: `${cliente.clI_nombre} ${cliente.clI_apellido}` // Concatenar nombre y apellido
                    }));
                    setLista(clientesConNombreCompleto);
                })
                .catch(error => console.error('Error fetching clients:', error));
    };

    const obtenerPosiblesClientes = () => {
        fetch('https://localhost:7228/api/PosibleCliente')
            .then(response => response.json())
            .then(data => {
                const posiblesClientesConNombreCompleto = data.map(posibleCliente => ({
                    ...posibleCliente,
                    nombreCompleto: `${posibleCliente.poC_nombre} ${posibleCliente.poC_apellido}` // Concatenar nombre y apellido
                }));
                setLista(posiblesClientesConNombreCompleto);
            })
            .catch(error => console.error('Error fetching prospects:', error));
    };

    useEffect(() => {
        if (opcionSeleccionada === 'clientes') {
            obtenerClientes();
        } else if (opcionSeleccionada === 'posiblesClientes') {
            obtenerPosiblesClientes();
        }
        setClienteSeleccionado(null);
    }, [opcionSeleccionada]);

    const handleReset = () => {
        const today = dayjs().format('YYYY-MM-DD');
        setOpcionSeleccionada('');
        setClienteSeleccionado(null);
        setLista([]);
        setTipoSeguimiento('');
        setFechaSeguimiento(today);
        setAsunto('');
        setProposito('');
        setResultado('');
        setComentario('');
        setNumeroSeguimiento('');
    };

    const onFinish = async (event) => {
        event.preventDefault();

        const nuevoNumeroSeguimiento = isEditMode ? numeroSeguimiento : await generarNumeroSeguimiento();

        const data = {
            usU_id: 1,
            clI_id: opcionSeleccionada === 'clientes' ? clienteSeleccionado : null,
            poC_id: opcionSeleccionada === 'posiblesClientes' ? clienteSeleccionado : null,
            seG_tipo_seguimiento: tipoSeguimiento,
            seG_fecha_seguimiento: dayjs(fechaSeguimiento).toISOString(),
            seG_asunto: asunto,
            seG_proposito_llamada: proposito,
            seG_resultado: resultado,
            seG_comentario: comentario,
            seG_numero_seguimiento: nuevoNumeroSeguimiento,
        };

        // Lógica para actualizar o crear seguimiento
        const url = isEditMode
            ? `https://localhost:7228/api/Seguimiento/${seguimiento.seG_id}`
            : 'https://localhost:7228/api/Seguimiento';

        const method = isEditMode ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al enviar el seguimiento');
                }
                return response.json();
            })
            .then(() => {
                Swal.fire({
                    title: "Éxito!",
                    text: isEditMode ? "Seguimiento Actualizado Correctamente!" : "Seguimiento Registrado Correctamente!",
                    icon: "success",
                    willOpen: () => {
                        document.querySelector('.swal2-container').style.zIndex = '3000';
                    }
                }).then(() => {
                    handleCloseModal();
                    refreshSeguimientos();
                });
                handleReset();
            })
            .catch((error) => {
                console.error('Error al enviar el seguimiento:', error);
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

    const obtenerUltimoNumeroSeguimiento = async () => {
        try {
            const response = await fetch('https://localhost:7228/api/Seguimiento');
            const data = await response.json();
    
            // Asegurarse de que hay datos y obtener el último número correctamente
            if (data && data.length > 0) {
                const ultimoSeguimiento = data
                    .sort((a, b) => {
                        const numA = parseInt(a.seG_numero_seguimiento.replace('SEG#', ''), 10);
                        const numB = parseInt(b.seG_numero_seguimiento.replace('SEG#', ''), 10);
                        return numB - numA;
                    })[0]; // Obtenemos el último seguimiento (el más alto)
    
                return ultimoSeguimiento ? ultimoSeguimiento.seG_numero_seguimiento : null;
            }
            return null; // Si no hay datos, retorna null
        } catch (error) {
            console.error('Error al obtener el último número de seguimiento:', error);
            return null;
        }
    };
    
    const generarNumeroSeguimiento = async () => {
        const ultimoNumero = await obtenerUltimoNumeroSeguimiento();
    
        if (!ultimoNumero) {
            // Si no existe ningún seguimiento, empezamos con SEG#0001
            return 'SEG#0001';
        }
    
        // Extraer el número y aumentarlo en 1
        const numero = parseInt(ultimoNumero.replace('SEG#', ''), 10) + 1;
    
        // Verifica que la conversión fue exitosa (que no obtuviste NaN)
        if (isNaN(numero)) {
            console.error('Error: No se pudo convertir el último número de seguimiento a un número válido.');
            return 'SEG#0001'; // Retorna el primer número en caso de error
        }
    
        // Retornar el nuevo número en formato SEG#XXXX
        return `SEG#${numero.toString().padStart(4, '0')}`;
    };
    

    return (
        <form className="row g-3" onSubmit={onFinish}>
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
                >
                    <option value=""></option>
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
                            {item.nombreCompleto}
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
                <input
                    type="date"
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
                <textarea className="form-control" value={comentario} onChange={(e) => setComentario(e.target.value)} rows="4"></textarea>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">{isEditMode ? 'Actualizar' : 'Guardar'}</button>
                <button type="button" className="btn btn-danger ms-2" onClick={handleReset}>Limpiar</button>
            </div>
        </form>
    );
};

export default NuevoSeguimiento;
