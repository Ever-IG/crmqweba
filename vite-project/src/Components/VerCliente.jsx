import React, { useState, useEffect } from 'react';
import EditarCliente from './EditarCliente'; // Ajusta la ruta si es necesario
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function VerCliente() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Cliente");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error al obtener los datos, vuelve a intentarlo dentro de 30 segundos.:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para manejar la edición
  const handleEdit = (clienteId) => {
    const cliente = data.find(item => item.clI_id === clienteId);
    setSelectedCliente(cliente); // Actualizamos el cliente seleccionado
    setShowModal(true); // Mostramos el modal
  };

  // Función para actualizar los datos del cliente en la lista
  const handleUpdate = (clienteId, updatedCliente) => {
    const updatedData = data.map(cliente =>
      cliente.clI_id === clienteId ? updatedCliente : cliente
    );
    setData(updatedData);
    setShowModal(false);  // Cerrar el modal
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "No, cancelar!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, proceder a eliminar
        fetch(`https://localhost:7228/api/Cliente/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el cliente');
          }
          // Actualizar la lista de clientes tras la eliminación
          setData(data.filter(cliente => cliente.clI_id !== id));
          Swal.fire('¡Eliminado!', 'El cliente ha sido eliminado.', 'success');
        })
        .catch(error => {
          console.error('Error deleting client:', error);
          Swal.fire('Error', 'Hubo un problema al eliminar el cliente.', 'error');
        });
      } else {
        Swal.fire('Cancelado', 'El cliente está a salvo :)', 'info');
      }
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Clientes">
      <header className="header-vista">
        <h3 className="header-title">Todos los clientes</h3>
      </header>
      
      <Table className="table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Empresa</th>
            <th>NIT</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.clI_id}>
                <td>{item.clI_nombre}</td>
                <td>{item.clI_apellido}</td>
                <td>{item.clI_empresa}</td>
                <td>{item.clI_nit}</td>
                <td>{item.clI_correo_electronico}</td>
                <td>{item.clI_telefono}</td>
                <td className='opciones'>
                  <Button
                    className="btn btn-sm me-2"
                    style={{ backgroundColor: '#43933d', color: 'white' }}
                    onClick={() => handleEdit(item.clI_id)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.clI_id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para editar el cliente */}
      {selectedCliente && (
        <EditarCliente
          show={showModal}
          handleClose={() => setShowModal(false)}
          cliente={selectedCliente}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default VerCliente;
