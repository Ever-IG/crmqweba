import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Paper, Checkbox,
  IconButton, Button, Modal, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { visuallyHidden } from '@mui/utils';
import ConvertirPaC from './ConvertirPaC';
import EditarPosibleCliente from './EditarPosibleCliente'; // Importar componente para editar

const headCells = [
  { id: 'poC_nombre_completo', numeric: false, disablePadding: true, label: 'Nombre Completo' },
  { id: 'poC_nit', numeric: false, disablePadding: false, label: 'NIT' },
  { id: 'poC_correo_electronico', numeric: false, disablePadding: false, label: 'Correo Electrónico' },
  { id: 'poC_telefono', numeric: false, disablePadding: false, label: 'Teléfono' },
  { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' }, 
];

function PosibleCliente() {
  const navigate = useNavigate();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('poC_nombre');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [posiblesClientes, setPosiblesClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  // Fetch de los posibles clientes
  const fetchPosiblesClientes = async () => {
    try {
      const response = await fetch('https://localhost:7228/api/PosibleCliente');
      const data = await response.json();
      const clientesFiltrados = data.filter(cliente => cliente.poC_estado_de_posible_cliente !== 'Cliente');
      setPosiblesClientes(clientesFiltrados);
    } catch (error) {
      console.error('Error al obtener posibles clientes:', error);
    }
  };

  useEffect(() => {
    fetchPosiblesClientes();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = posiblesClientes.map((n) => n.poC_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://localhost:7228/api/PosibleCliente/${id}`, { method: 'DELETE' });
          setPosiblesClientes(posiblesClientes.filter((cliente) => cliente.poC_id !== id));
          Swal.fire('¡Eliminado!', 'El posible cliente ha sido eliminado.', 'success');
        } catch (error) {
          console.error('Error al eliminar el posible cliente:', error);
        }
      }
    });
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente); // Guardar el cliente seleccionado
    setShowModal(true); // Mostrar el modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Cerrar el modal
    setSelectedCliente(null); // Limpiar el cliente seleccionado
  };

  const handleUpdate = (id, updatedCliente) => {
    setPosiblesClientes((prevClientes) =>
      prevClientes.map((cliente) => (cliente.poC_id === id ? updatedCliente : cliente))
    );
    handleCloseModal();
  };

  const visibleRows = [...posiblesClientes]
    .sort((a, b) => (orderBy === 'asc' ? a[orderBy].localeCompare(b[orderBy]) : b[orderBy].localeCompare(a[orderBy])))
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleNavigate = () => {
    navigate('/NuevoPosibleCliente');
  };

  const handleClienteConvertido = (id) => {
    setPosiblesClientes(prevClientes => prevClientes.filter(cliente => cliente.poC_id !== id));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <header className="header-vista">
        <h3 className="header-title">Posibles Clientes</h3>
          <Button 
          variant='contained'
          onClick={() => navigate('/NuevoPosibleCliente')}
            style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}
          >
            Nuevo
          </Button>
      </header>

      <Paper sx={{ width: '100%', margin: '0 auto', mb: 0, padding: 10 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < posiblesClientes.length}
                    checked={posiblesClientes.length > 0 && selected.length === posiblesClientes.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all' }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ width: 200 }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((row) => (
                <TableRow hover role="checkbox" key={row.poC_id}>
                  <TableCell padding="checkbox">
                    <Checkbox color="primary" checked={selected.indexOf(row.poC_id) !== -1} />
                  </TableCell>
                  <TableCell component="th" scope="row" padding="none" sx={{ width: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {`${row.poC_nombre} ${row.poC_apellido}`}
                  </TableCell>
                  <TableCell sx={{ width: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.poC_nit}
                  </TableCell>
                  <TableCell sx={{ width: 150, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.poC_correo_electronico}
                  </TableCell>
                  <TableCell sx={{ width: 100, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {row.poC_telefono}
                  </TableCell>
                  <TableCell sx={{ width: 250 }}>
                  <ConvertirPaC posibleCliente={row} onClienteConvertido={handleClienteConvertido} />
                    <IconButton onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.poC_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={posiblesClientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}
        />
      </Paper>

      {/* Modal para editar cliente */}
      <Modal open={showModal} onClose={handleCloseModal}>
        <Box sx={{ 
          padding: 3, 
          backgroundColor: 'white', 
          width: 600, 
          margin: '100px auto', 
          marginTop: 1 ,
          position: 'relative',
    borderRadius: 4,
    boxShadow: 24,
    maxHeight: '100vh',  // Limitar la altura del modal al 80% de la ventana
      overflowY: 'auto', 
          }}>
          <IconButton
      aria-label="close"
      onClick={handleCloseModal} // Use the updated handleCloseModal here
      sx={{ position: 'absolute', right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
          <Typography variant="h6" component="h2">
            Editar Posible Cliente
          </Typography>
          {selectedCliente && (
            <EditarPosibleCliente
              posiblecliente={selectedCliente}
              handleUpdate={handleUpdate}
              handleClose={handleCloseModal}
            />
          )}
        </Box>
      </Modal>

    </Box>
  );
}

export default PosibleCliente;
