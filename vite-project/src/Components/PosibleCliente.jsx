import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Table } from 'antd';
import EditarPosibleCliente from './EditarPosibleCliente';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

function PosibleCliente() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const open = Boolean(anchorEl);

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

  const handleNavigate = () => {
    navigate('/NuevoPosibleCliente');
  };

  const handleEdit = (posibleclienteId) => {
    const posiblecliente = data.find(item => item.poC_id === posibleclienteId);
    setSelectedCliente(posiblecliente);
    setShowModal(true); // Mostrar el modal
  };

  const handleUpdate = (posibleclienteId, updatedPosibleCliente) => {
    const updatedData = data.map(posiblecliente =>
      posiblecliente.poC_id === posibleclienteId ? updatedPosibleCliente : posiblecliente
    );
    setData(updatedData);
    setShowModal(false);  // Cerrar el modal
  };

  const handleDelete = (id) => {
    Swal.mixin({
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
        fetch('https://localhost:7228/api/PosibleCliente/${id}', {
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
      dataIndex: 'poC_nombre',
      key: 'poC_nombre',
    },
    {
      title: 'Apellido',
      dataIndex: 'poC_apellido',
      key: 'poC_apellido',
    },
    {
      title: 'Empresa',
      dataIndex: 'poC_empresa',
      key: 'poC_empresa',
    },
    {
      title: 'NIT',
      dataIndex: 'poC_nit',
      key: 'poC_nit',
    },
    {
      title: 'NIT',
      dataIndex: 'poC_nit',
      key: 'poC_nit',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'poC_correo_electronico',
      key: 'poC_correo_electronico',
    },
    {
      title: 'Teléfono',
      dataIndex: 'poC_telefono',
      key: 'poC_telefono',
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
              handleEdit(record.poC_id);
              handleCloseMenu();
            }}>Editar</MenuItem>
            <MenuItem onClick={() => {
              handleDelete(record.poC_id);
              handleCloseMenu();
            }}>Eliminar</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <div className="PosibleCliente">
      <header className="header-vista">
        <h3 className="header-title"> Todos los posibles clientes</h3>
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
        rowKey="poC_id" 
        pagination={{ pageSize: 10 }}  
        scroll={{ y: 500 }}
        style={{ width: '100%' }}
      />

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