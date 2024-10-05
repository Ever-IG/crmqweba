import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function VerQueja() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedQueja, setSelectedQueja] = useState(null);

  // Obtener los datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Queja");
        if (!response.ok) {
          throw new Error('Error al obtener los Quejas');
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
  const handleEdit = (QuejaId) => {
    const Queja = data.find(item => item.quE_id === QuejaId);
    setSelectedQueja(Queja);
    setShowModal(true);
  };

  // Función para actualizar los datos del Queja en la lista
  const handleUpdate = (QuejaId, updatedQueja) => {
    const updatedData = data.map(Queja =>
      Queja.quE_id === QuejaId ? updatedQueja : Queja
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
      fetch(`https://localhost:7228/api/Queja/${id}`, {
        method: 'DELETE'
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al eliminar el Queja');
        }

        // Actualizar la lista tras la eliminación
        setData(data.filter(Queja => Queja.quE_id !== id));

        // Mostrar mensaje de éxito con Swal
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'El Queja ha sido eliminado.',
          'success'
        );
      })
      .catch(error => {
        console.error('Error deleting client:', error);
        swalWithBootstrapButtons.fire(
          'Error',
          'Hubo un problema al eliminar el Queja.',
          'error'
        );
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire(
        'Cancelado',
        'La Queja está a salvo :)',
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
    <div className="Quejas">
      <header className="header-vista">
        <h3 className="header-title">Todos las Quejas</h3>
        <Button className="nuevo-btn" variant="contained" color="primary">
          Nuevo
        </Button>
      </header>
      <table className="table table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>PRIORIDAD</th>
            <th>ESTADO</th>
            <th>FECHA</th>
            <th>MOTIVO</th>
            <th>DESCRIPCION</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No hay Quejas disponibles</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.quE_id}>
                <td>{item.quE_prioridad}</td>
                <td>{item.quE_estado}</td>
                <td>{item.quE_fecha}</td>
                <td>{item.quE_motivo}</td>
                <td>{item.quE_descripcion}</td>
                <td className='opciones'>
                  {/*<Button 
                    className="btn btn-sm me-2"
                    style={{
                      backgroundColor: '#43933d',
                      border: '',
                      color: 'white',
                      outline: 'none',
                      boxShadow: 'none',
                      alignContent: 'center'
                    }}
                    onClick={() => handleEdit(item.quE_id)}
                  >
                    Editar
                  </Button>
                  <Button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.quE_id)}
                  >
                    Eliminar
                  </Button>
                  */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal para editar el Queja */}
     
    </div>
  );
}

export default VerQueja;