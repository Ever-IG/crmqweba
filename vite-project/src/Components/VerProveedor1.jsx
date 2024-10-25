import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Table } from 'antd';
import EditarProveedor from './EditarProveedor';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ITEM_HEIGHT = 48;

function VerProveedor() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Proveedor");
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
    navigate('/NuevoProveedor');
  };

  const handleEdit = (ProveedorId) => {
    const Proveedor = data.find(item => item.prO_id === ProveedorId);
    setSelectedProveedor(Proveedor);
    setShowModal(true); // Mostrar el modal
  };

  const handleUpdate = (ProveedorId, updatedProveedor) => {
    const updatedData = data.map(Proveedor =>
      Proveedor.prO_id === ProveedorId ? updatedProveedor : Proveedor
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
        fetch('https://localhost:7228/api/Proveedor/${id}', {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Error al eliminar el Proveedor');
            }
            setData(data.filter(Proveedor => Proveedor.prO_id !== id));
            swalWithBootstrapButtons.fire(
              '¡Eliminado!',
              'El Proveedor ha sido eliminado.',
              'success'
            );
          })
          .catch(error => {
            console.error('Error deleting client:', error);
            swalWithBootstrapButtons.fire(
              'Error',
              'Hubo un problema al eliminar el Proveedor.',
              'error'
            );
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El Proveedor está a salvo :)',
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
      dataIndex: 'prO_nombre',
      key: 'prO_nombre',
      render: (text, record) => (
        <Link to={{}}>{text}</Link>
      ),
    },
    {
      title: 'Apellido',
      dataIndex: 'prO_apellido',
      key: 'prO_apellido',
    },
    {
      title: 'Empresa',
      dataIndex: 'prO_empresa',
      key: 'prO_empresa',
    },
    {
      title: 'NIT',
      dataIndex: 'prO_nit',
      key: 'prO_nit',
    },
    {
      title: 'Correo electrónico',
      dataIndex: 'prO_correo_electronico',
      key: 'prO_correo_electronico',
    },
    {
      title: 'Teléfono',
      dataIndex: 'prO_telefono',
      key: 'prO_telefono',
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (text, record) => (
        <Link to={{}}>Convertir a Proveedor</Link>
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
              handleEdit(record.prO_id);
              handleCloseMenu();
            }}>Editar</MenuItem>
            <MenuItem onClick={() => {
              handleDelete(record.prO_id);
              handleCloseMenu();
            }}>Eliminar</MenuItem>
          </Menu>
        </div>
      ),
    },
  ];

  return (
    <div className="Proveedor">
      <header className="header-vista">
        <h3 className="header-title"> Todos los Proveedor</h3>
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
        rowKey="prO_id" 
        pagination={{ pageSize: 10 }}  
        scroll={{ y: 500 }}
        style={{ width: '100%' }}
      />

      {/* Modal para editar el Proveedor */}
      {selectedProveedor && (
        <EditarProveedor
          show={showModal}
          handleClose={() => setShowModal(false)}
          Proveedor={selectedProveedor}
          handleUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default VerProveedor;