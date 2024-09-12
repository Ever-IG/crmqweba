import React, { useState, useEffect } from 'react';
import EditarProveedor from './EditarProveedor';  // El modal para editar proveedores
import Swal from 'sweetalert2';

function VerProveedor() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Proveedor");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log('API Response:', result); // Log the response for debugging
        setData(result); // Ajusta según el formato de tu respuesta de API
      } catch (error) {
        console.error('Error fetching data:', error); // Log any errors
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Función para manejar la edición
  const handleEdit = (proveedorId) => {
    const proveedor = data.find(item => item.prO_id === proveedorId);
    setSelectedProveedor(proveedor);
    setShowModal(true);
  };

  // Función para actualizar los datos del proveedor en la lista
  const handleUpdate = (proveedorId, updatedProveedor) => {
    const updatedData = data.map(proveedor =>
      proveedor.prO_id === proveedorId ? updatedProveedor : proveedor
    );
    setData(updatedData);
    setShowModal(false);  // Cerrar el modal
  };

  // Función para manejar la eliminación
  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2',  // Agregar margen al botón de confirmación
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
        fetch('https://localhost:7228/api/Proveedor/${id}', {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar el proveedor');
          }

          // Actualizar la lista tras la eliminación
          setData(data.filter(proveedor => proveedor.prO_id !== id));

          // Mostrar mensaje de éxito con Swal
          swalWithBootstrapButtons.fire(
            '¡Eliminado!',
            'El proveedor ha sido eliminado.',
            'success'
          );
        })
        .catch(error => {
          console.error('Error deleting client:', error);
          swalWithBootstrapButtons.fire(
            'Error',
            'Hubo un problema al eliminar el proveedor.',
            'error'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El proveedor está a salvo :)',
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
    <div className="Proveedores">
      <header className="header-vista">
        <h3 className="header-title">Todos los proveedores</h3>
      </header>
      <table className="table table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Nombre Empresa</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="9">No data available</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.prO_id}>
                <td>{item.prO_nombre}</td>
                <td>{item.prO_apellido}</td>
                <td>{item.prO_nombre_empresa}</td>
                <td>{item.prO_nit}</td>
                <td>{item.prO_telefono}</td>
                <td>{item.prO_correo_electronico}</td>
                <td className='opciones'>
                  <button 
                    className="btn btn-sm me-2"
                    style={{ backgroundColor: '#43933d', color: 'white', outline: 'none', boxShadow: 'none' }}
                    onClick={() => handleEdit(item.prO_id)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.prO_id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal para editar el proveedor */}
      {selectedProveedor && (
        <EditarProveedor 
          show={showModal} 
          handleClose={() => setShowModal(false)} 
          proveedor={selectedProveedor} 
          handleUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}

export default VerProveedor;