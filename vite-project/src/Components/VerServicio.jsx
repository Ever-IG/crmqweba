import React, { useState, useEffect } from 'react';
import EditarServicio from './EditarServicio';  // El modal para editar servicios
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function VerServicio() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedServicio, setSelectedServicio] = useState(null);

  // Obtener los datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Servicio");
        if (!response.ok) {
          throw new Error('Error al obtener los servicios');
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para manejar la edición
  const handleEdit = (servicioId) => {
    const servicio = data.find(item => item.seR_id === servicioId);
    setSelectedServicio(servicio);
    setShowModal(true);
  };

  // Función para actualizar los datos del servicio en la lista
  const handleUpdate = (servicioId, updatedServicio) => {
    const updatedData = data.map(servicio =>
      servicio.seR_id === servicioId ? updatedServicio : servicio
    );
    setData(updatedData);
    setShowModal(false);  // Cerrar el modal
  };

// Función para manejar la eliminación
const handleDelete = (id) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success me-2', 
      cancelButton: 'btn btn-danger me-4'
    },
    buttonsStyling: false
  });
  // Mostrar el Swal de confirmación
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
      // Si el usuario confirma, proceder a eliminar
      fetch(`https://localhost:7228/api/Servicio/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el servicio');
        }

        // Actualizar la lista tras la eliminación
        setData(data.filter(servicio => servicio.seR_id !== id));

        // Mostrar mensaje de éxito con Swal
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'El servicio ha sido eliminado.',
          'success'
        );
      })
      .catch(error => {
        console.error('Error deleting client:', error);
        swalWithBootstrapButtons.fire(
          'Error',
          'Hubo un problema al eliminar el servicio.',
          'error'
        );
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'El servicio está a salvo :)',
        'error'
      );
    }
  });
};
 

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="Servicios">
      <header className="header-vista">
        <h3 className="header-title">Todos los servicios</h3>
        <Button className="nuevo-btn" variant="contained" color="primary">
          Nuevo
        </Button>
      </header>
      <table className="table table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No hay servicios disponibles</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.seR_id}>
                <td>{item.seR_nombre}</td>
                <td>{item.seR_descripcion}</td>
                <td>Q {item.seR_precio.toFixed(2)}</td>
                <td className='opciones'>
                  <Button 
                    className="btn btn-sm me-2"
                    style={{
                      backgroundColor: '#43933d',
                      border: '',
                      color: 'white',
                      outline: 'none',
                      boxShadow: 'none',
                      alignContent: 'center'
                    }}
                    onClick={() => handleEdit(item.seR_id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.seR_id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal para editar el servicio */}
      {selectedServicio && (
        <EditarServicio 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          servicio={selectedServicio} 
          handleUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}

export default VerServicio;
