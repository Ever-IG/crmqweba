import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Clientes() {
    const [clientes, setClientes] = useState([]);
    const [newCliente, setNewCliente] = useState({
        clI_nombre: '',
        clI_apellido: '',
        clI_correo_electronico: '',
        clI_telefono: '',
        clI_nit: ''
    });
    const [editingCliente, setEditingCliente] = useState(null);

    // Obtener clientes al cargar el componente
    useEffect(() => {
        fetch('https://localhost:7228/api/Cliente')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }
                return response.json();
            })
            .then(data => setClientes(data))
            .catch(error => console.error('Error fetching clients:', error));
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        setNewCliente({
            ...newCliente,
            [e.target.name]: e.target.value
        });
    };

    // Manejar la creación o actualización del cliente
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que los campos obligatorios estén completos
        if (!newCliente.clI_nombre || !newCliente.clI_correo_electronico) {
            toast.error('Nombre y correo son obligatorios', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            return;
        }

        if (editingCliente) {
            // Actualizar cliente existente usando el ID capturado
            fetch(`https://localhost:7228/api/Clientes/${editingCliente.clI_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCliente)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el cliente');
                }
                return response.json();
            })
            .then(data => {
                setClientes(clientes.map(cliente => cliente.clI_id === data.clI_id ? data : cliente));
                setNewCliente({ clI_nombre: '', clI_apellido: '', clI_correo_electronico: '', clI_telefono: '', clI_nit: '' });
                setEditingCliente(null);

                toast.success('Cliente actualizado correctamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(error => console.error('Error updating client:', error));
        } else {
            // Crear nuevo cliente
            fetch('https://localhost:7228/api/Clientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCliente)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al agregar el cliente');
                }
                return response.json();
            })
            .then(data => {
                setClientes([...clientes, data]);
                setNewCliente({ clI_nombre: '', clI_apellido: '', clI_correo_electronico: '', clI_telefono: '', clI_nit: '' });

                toast.success('Cliente agregado correctamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(error => console.error('Error adding client:', error));
        }
    };

    // Función para manejar la edición de un cliente
    const handleEdit = (id) => {
        const clienteToEdit = clientes.find(cliente => cliente.clI_id === id);
        if (clienteToEdit) {
            setNewCliente({
                clI_nombre: clienteToEdit.clI_nombre,
                clI_apellido: clienteToEdit.clI_apellido,
                clI_correo_electronico: clienteToEdit.clI_correo_electronico,
                clI_telefono: clienteToEdit.clI_telefono,
                clI_nit: clienteToEdit.clI_nit
            });
            setEditingCliente(clienteToEdit);
        }
    };

    // Función para eliminar un cliente
    const handleDelete = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este cliente?')) {
            fetch(`https://localhost:7228/api/Clientes/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al eliminar el cliente');
                }
                setClientes(clientes.filter(cliente => cliente.clI_id !== id));

                toast.success('Cliente eliminado correctamente!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            })
            .catch(error => console.error('Error deleting client:', error));
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer />
            <h2 className="mb-4">Lista de Clientes</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>NIT</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map(cliente => (
                        <tr key={cliente.clI_id}>
                            <td>{cliente.clI_nombre}</td>
                            <td>{cliente.clI_apellido}</td>
                            <td>{cliente.clI_correo_electronico}</td>
                            <td>{cliente.clI_telefono}</td>
                            <td>{cliente.clI_nit}</td>
                            <td>
                                <button 
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(cliente.clI_id)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(cliente.clI_id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="mb-4">{editingCliente ? 'Editar Cliente' : 'Agregar Cliente'}</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group mb-3">
                    <label htmlFor="clI_nombre">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clI_nombre"
                        name="clI_nombre"
                        placeholder="Nombre"
                        value={newCliente.clI_nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="clI_apellido">Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clI_apellido"
                        name="clI_apellido"
                        placeholder="Apellido"
                        value={newCliente.clI_apellido}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="clI_correo_electronico">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="clI_correo_electronico"
                        name="clI_correo_electronico"
                        placeholder="Email"
                        value={newCliente.clI_correo_electronico}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="clI_telefono">Teléfono</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clI_telefono"
                        name="clI_telefono"
                        placeholder="Teléfono"
                        value={newCliente.clI_telefono}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="clI_nit">NIT</label>
                    <input
                        type="text"
                        className="form-control"
                        id="clI_nit"
                        name="clI_nit"
                        placeholder="NIT"
                        value={newCliente.clI_nit}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editingCliente ? 'Actualizar Cliente' : 'Agregar Cliente'}
                </button>
            </form>
        </div>
    );
}

export default Clientes;
