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
        const responseQuejas = await fetch("https://localhost:7228/api/Queja");
        if (!responseQuejas.ok) {
          throw new Error('Error al obtener las quejas');
        }
        const responseClientes = await fetch('https://localhost:7228/api/Cliente');
        if (!responseClientes.ok) {
          throw new Error('Error al obtener los clientes');
        }

        const quejasData = await responseQuejas.json();
        const clientesData = await responseClientes.json();

        // Procesar los datos de quejas y asociar el nombre completo del cliente
        const processedData = quejasData.map((queja) => {
          let nombreCompleto = 'Cliente desconocido';

          // Buscar el cliente por su clI_id
          if (queja.clI_id) {
            const cliente = clientesData.find((c) => c.clI_id === queja.clI_id);
            if (cliente) {
              nombreCompleto = `${cliente.clI_nombre} ${cliente.clI_apellido}`; // Concatenar nombre y apellido
            }
          }

          return { ...queja, nombre: nombreCompleto }; // Asignar el nombre completo concatenado
        });

        setData(processedData);
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
        fetch(https`://localhost:7228/api/Queja/${id}`, {
          method: 'DELETE'
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al eliminar la queja');
          }

          // Actualizar la lista tras la eliminación
          setData(data.filter(Queja => Queja.quE_id !== id));

          // Mostrar mensaje de éxito con Swal
          swalWithBootstrapButtons.fire(
            '¡Eliminado!',
            'La queja ha sido eliminada.',
            'success'
          );
        })
        .catch(error => {
          console.error('Error deleting queja:', error);
          swalWithBootstrapButtons.fire(
            'Error',
            'Hubo un problema al eliminar la queja.',
            'error'
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'La queja está a salvo :)',
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
        <h3 className="header-title">Todas las Quejas</h3>
        <Button
                    className="btn btn-sm me-2"
                    style={{ backgroundColor: '#43933d', color: 'white' }}
                    onClick={() => handleEdit(item.quE_id)}
                  >
                    Agregar Nueva
                  </Button>
      </header>
      <Table className="table table-vista">
        <thead className='thead-vista'>
          <tr>
            <th>Cliente</th>
            <th>PRIORIDAD</th>
            <th>ESTADO</th>
            <th>FECHA</th>
            <th>MOTIVO</th>
            <th>DESCRIPCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">No hay quejas disponibles</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.quE_id}>
                <td>{item.nombre}</td> {/* Mostrar el nombre completo del cliente */}
                <td>{item.quE_prioridad}</td>
                <td>{item.quE_estado}</td>
                <td>{item.quE_fecha}</td>
                <td>{item.quE_motivo}</td>
                <td>{item.quE_descripcion}</td>
                <td className='opciones'>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      

      {/* Modal para editar la queja */}
      {selectedQueja && (
        <ModalQueja
          show={showModal}
          handleClose={() => setShowModal(false)}
          queja={selectedQueja}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}


export default VerQueja;