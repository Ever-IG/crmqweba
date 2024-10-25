import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, Button, Modal
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import dayjs from 'dayjs';
import NuevoSeguimiento from './NuevoSeguimiento';
import EditarSeguimiento from './EditarSeguimiento';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: 'seG_numero_seguimiento', numeric: false, disablePadding: true, label: 'Número de Seguimiento' },
  { id: 'nombre', numeric: false, disablePadding: true, label: 'Nombre y Apellido' },
  { id: 'seG_tipo_seguimiento', numeric: false, disablePadding: false, label: 'Tipo de Seguimiento' },
  { id: 'seG_fecha_seguimiento', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'seG_resultado', numeric: false, disablePadding: false, label: 'Resultado' },
  { id: 'acciones', numeric: false, disablePadding: false, label: 'Acciones' }, 
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
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
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar sx={[{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }, numSelected > 0 && {
      bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
    }]}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Todos Los Seguimientos
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('seG_fecha_seguimiento');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [seguimientos, setSeguimientos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Controlar si es edición
  const [seguimientoSeleccionado, setSeguimientoSeleccionado] = useState(null); // Estado para el modal

  const handleEdit = (seguimiento) => {
    setIsEditMode(true); // Cambiar a modo edición
    setSeguimientoSeleccionado(seguimiento); // Establecer el seguimiento a editar
    setIsModalVisible(true); // Abrir el modal
  };

  const obtenerSeguimientos = async () => {
    try {
      const response = await fetch('https://localhost:7228/api/Seguimiento');
      const data = await response.json();
      
      const clientesResponse = await fetch('https://localhost:7228/api/Cliente');
      const clientesData = await clientesResponse.json();
  
      const posiblesClientesResponse = await fetch('https://localhost:7228/api/PosibleCliente');
      const posiblesClientesData = await posiblesClientesResponse.json();
  
      // Agregar nombre completo (nombre + apellido) a los seguimientos
      const processedData = data.map((seguimiento) => {
        let nombreCompleto = '';
  
        if (seguimiento.clI_id) {
          const cliente = clientesData.find((c) => c.clI_id === seguimiento.clI_id);
          nombreCompleto = cliente 
            ? `${cliente.clI_nombre} ${cliente.clI_apellido}`  // Concatenar nombre y apellido
            : `Cliente ID: ${seguimiento.clI_id}`;
        } else if (seguimiento.poC_id) {
          const posibleCliente = posiblesClientesData.find((p) => p.poC_id === seguimiento.poC_id);
          nombreCompleto = posibleCliente 
            ? `${posibleCliente.poC_nombre} ${posibleCliente.poC_apellido}`  // Concatenar nombre y apellido
            : `Posible Cliente ID: ${seguimiento.poC_id}`;
        }
  
        return { ...seguimiento, nombre: nombreCompleto }; // Asignar el nombre completo concatenado
      });
  
      setSeguimientos(processedData);
    } catch (error) {
      console.error('Error fetching seguimientos:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:7228/api/Seguimiento/${id}`, { method: 'DELETE' });
      setSeguimientos(seguimientos.filter((seguimiento) => seguimiento.seG_id !== id));
    } catch (error) {
      console.error('Error al eliminar el seguimiento:', error);
    }
    setSelected((prevSelected) => prevSelected.filter((selectedId) => selectedId !== id));
  };
  

  useEffect(() => {
    obtenerSeguimientos();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = seguimientos.map((n) => n.seG_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleOpenModal = () => {
    setSeguimientoSeleccionado(null); // Limpiar el seguimiento seleccionado para que no haya datos al crear uno nuevo
    setIsEditMode(false); // Asegurarse de que está en modo de nuevo seguimiento
    setIsModalVisible(true);
  };
  
  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelected([]); // Limpiar la selección cuando se cierra el modal
  };
  

  const visibleRows = React.useMemo(() =>
    [...seguimientos]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, seguimientos]
  );

  const obtenerUltimoNumeroSeguimiento = async () => {
    try {
      const response = await fetch('https://localhost:7228/api/Seguimiento');
      const data = await response.json();
      
      // Ordenar los seguimientos para obtener el más reciente
      const ultimoSeguimiento = data.sort((a, b) => {
        const numA = parseInt(a.seG_numero_seguimiento.replace('Seg-', ''));
        const numB = parseInt(b.seG_numero_seguimiento.replace('Seg-', ''));
        return numB - numA;
      })[0]; // Obtenemos el primero ya que está ordenado de mayor a menor
  
      return ultimoSeguimiento ? ultimoSeguimiento.seG_numero_seguimiento : null;
    } catch (error) {
      console.error('Error al obtener el último número de seguimiento:', error);
      return null;
    }
  };

  
  return (
    <Box sx={{ width: '100%' }}>
      {/* Encabezado y botón */}
      <header className="header-vista">
        <h3 className="header-title">Seguimientos</h3>
        <div className="botones-contenedor">
          <Button
            className="nuevo-btn"
            type="primary"
            onClick={handleOpenModal}  // Aquí seguimos usando handleOpenModal para abrir el modal
            style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}
          >
            Nuevo
          </Button>
        </div>
      </header>

      {/* Tabla */}
      <Paper 
      sx={{ 
        width: '100%',   // Limitar el ancho máximo de la tabla
        margin: '0 auto',    // Márgenes automáticos para centrar la tabla
        mb: 0,               // Margen inferior
        padding: 10         // Agregar padding opcional
      }}
    >
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={seguimientos.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.seG_id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.seG_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.seG_id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.seG_numero_seguimiento}
                    </TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="left">{row.seG_tipo_seguimiento}</TableCell>
                    <TableCell align="left">{dayjs(row.seG_fecha_seguimiento).format('DD-MM-YYYY')}</TableCell>
                    <TableCell align="left">{row.seG_resultado}</TableCell>
                    <TableCell align="left">
                      {/* Botón para eliminar */}
                      <IconButton
            aria-label="delete"
            onClick={() => {
              // Mostrar la alerta de confirmación
              Swal.fire({
                title: '¿Estás seguro?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminarlo',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  // Si el usuario confirma, ejecuta la función para eliminar el seguimiento
                  handleDelete(row.seG_id).then(() => {
                    // Mostrar alerta de éxito
                    Swal.fire({
                      title: 'Eliminado!',
                      text: 'El seguimiento ha sido eliminado.',
                      icon: 'success',
                    });
                  });
                }
              });
              setSelected([]);
            }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => handleEdit(row)}>
            <EditIcon />
            </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={seguimientos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"

          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`}

        />
      </Paper>


      {/* Modal */}
      <Modal
  open={isModalVisible}
  onClose={handleCloseModal} // Use the updated handleCloseModal here
>
  <Box sx={{
    padding: 2,
    backgroundColor: 'white',
    margin: '100px auto',
    marginTop: 1,
    width: 600,
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
      {isEditMode ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}
    </Typography>
    <hr />

    {isEditMode ? (
      <EditarSeguimiento
        seguimiento={seguimientoSeleccionado}
        handleCloseModal={handleCloseModal}
      />
    ) : (
      <NuevoSeguimiento handleCloseModal={handleCloseModal} 
      refreshSeguimientos={obtenerSeguimientos}/>
    )}
  </Box>
</Modal>




    </Box>
  );
}
