import React, { useState, useEffect } from 'react';
import EditarServicio from './EditarServicio';  // El modal para editar servicios
import { Button, Table } from 'react-bootstrap';
import Swal from 'sweetalert2';

function PruebaVerservicio() {
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
 
//here
const handleMenuClick = (event, record) => {
    setAnchorEl(event.currentTarget);
    setSelectedOption(record);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>Error al obtener los datos, vuelve a intentarlo</div>;
  }

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'seR_nombre',
      key: 'seR_nombre',
      render: (text, record) => (
        <Link to={{}}>{text}</Link>
      ),
    },
    {
      title: 'seR_descriçion',
      dataIndex: 'seR_descriçion',
      key: 'poC_apellido',
    },
    {
      title: 'seR_precio',
      dataIndex: 'seR_precio',
      key: 'poC_empresa',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Link to={{}}>Convertir a cliente</Link>
      ),
    },
    {
      title: 'Opciones',
      key: 'acciones',
      render: (text, record) => (
        <div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={(event) => handleMenuClick(event, record)}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open && selectedOption === record}
            onClose={handleCloseMenu}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: '20ch',
              },
            }}
          >
            <MenuItem onClick={() => {
              handleEdit(record.seR_id);
              handleCloseMenu();
            }}>Editar</MenuItem>
            <MenuItem onClick={() => {
              handleDelete(record.seR_id);
              handleCloseMenu();
            }}>Eliminar</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <div className="Servicios">
      <header className="header-vista">
        <h3 className="header-title"> Todos los Servicios disponibles </h3>
        <div className="botones-contenedor">
          <Button className="nuevo-btn" type="primary" onClick={handleNavigate}
           style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}>
            Nuevo
          </Button>
        </div>
      </header>

      <Table className='table'
        columns={columns}
        dataSource={data}
        rowKey="seR_id" 
        pagination={{ pageSize: 10 }}  
        scroll={{ y: 500 }}
        style={{ width: '100%' }}
      />

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

export default PruebaVerservicio;
