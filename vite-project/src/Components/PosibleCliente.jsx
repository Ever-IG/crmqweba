import React, { useState, useEffect } from 'react';
import EditarPosibleCliente from './EditarPosibleCliente'; // Ajusta la ruta si es necesario
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';

function PosibleCliente() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/PosibleCliente");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API Response:', result);
        setData(result);
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (posibleclienteId) => {
    const posiblecliente = data.find(item => item.poC_id === posibleclienteId);
    setSelectedCliente(posiblecliente);
    setShowModal(true); // Mostrar el modal
  };

  // Función para actualizar los datos del cliente en la lista
  const handleUpdate = (posibleclienteId, updatedPosibleCliente) => {
    const updatedData = data.map(posiblecliente =>
      posiblecliente.poC_id === posibleclienteId ? updatedPosibleCliente : posiblecliente
    );
    setData(updatedData);
    setShowModal(false);  // Cerrar el modal
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger me-4'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:7228/api/PosibleCliente/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el posible cliente');
            }
            setData(data.filter(posiblecliente => posiblecliente.poC_id !== id));
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El posible cliente ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting client:', error);
            swalWithBootstrapButtons.fire(
              'Error',
              'Hubo un problema al eliminar el cliente.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El posible cliente está a salvo :)',
          'error'
        );
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
    <div className="PosibleCliente">
      <header className="header-vista">
        <h3 className="header-title"> Todos los posibles clientes</h3>
        <Button className="nuevo-btn" variant="contained" color="primary">
          Nuevo
        </Button>
      </header>

      <table className="table table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Empresa</th>
            <th>NIT</th>
            <th>DPI</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="8">No data available</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.poC_id}>
                <td>{item.poC_nombre}</td>
                <td>{item.poC_apellido}</td>
                <td>{item.poC_empresa}</td>
                <td>{item.poC_nit}</td>
                <td>{item.poC_dpi}</td>
                <td>{item.poC_correo_electronico}</td>
                <td>{item.poC_telefono}</td>
                <td className='opciones'>
                  <button
                    className="btn btn-sm me-2"
                    style={{ 
                      backgroundColor: '#43933d', 
                      border: '', 
                      color: 'white', 
                      outline: 'none', 
                      boxShadow: 'none' 
                    }}
                    onClick={() => handleEdit(item.poC_id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.poC_id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal para editar el posible cliente */}
      {selectedCliente && (
        <EditarPosibleCliente
          show={showModal}
          handleClose={() => setShowModal(false)}
          posiblecliente={selectedCliente}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default PosibleCliente;
