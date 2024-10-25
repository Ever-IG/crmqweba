import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, Button, Modal
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import NuevoProveedor from './NuevoProveedor';
import EditarProveedor from './EditarProveedor';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import EditIcon from '@mui/icons-material/Edit';

const headCells = [
  { id: "nombre_completo", numeric: false, disablePadding: false, label: "Nombre Completo" },
  { id: "empresa", numeric: false, disablePadding: false, label: "Empresa" },
  { id: "nit", numeric: false, disablePadding: false, label: "NIT" },
  { id: "correo", numeric: false, disablePadding: false, label: "Correo" },
  { id: "telefono", numeric: false, disablePadding: false, label: "Teléfono" },
  { id: "acciones", numeric: false, disablePadding: false, label: "Acciones" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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
            inputProps={{ "aria-label": "Seleccionar todo" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "Ordenado Descendente" : "Ordenado Ascendente"}
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
          Todos Los Proveedores
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

export default function VerProveedor() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre_completo");
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleEdit = (proveedor) => {
    setIsEditMode(true);
    setSelectedProveedor(proveedor);
    setIsModalVisible(true);
  };

  const obtenerProveedores = async () => {
    try {
      const response = await fetch("https://localhost:7228/api/Proveedor");
      const proveedoresData = await response.json();

      setData(proveedoresData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`https://localhost:7228/api/Proveedor/${id}`, { method: "DELETE" });
      setData(data.filter((p) => p.prO_id !== id));
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
    }
    setSelected((prevSelected) => prevSelected.filter((p) => p.prO_id !== id));
  };

  useEffect(() => {
    obtenerProveedores();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.prO_id);
      setSelected(newSelecteds);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => setRowsPerPage(parseInt(event.target.value, 10));

  const handleOpenModal = () => {
    setSelectedProveedor(null);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelected([]);
  };

  const visibleRows = React.useMemo(() =>
    [...data]
      .sort(getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <header className="header-vista">
        <h3 className="header-title">Proveedores</h3>
        <div className="botones-contenedor">
          <Button
            className="nuevo-btn"
            variant="primary"
            onClick={handleOpenModal}
            style={{ backgroundColor: "#8E0D3C", color: "#ffffff" }}
          >
            Nuevo
          </Button>
        </div>
      </header>

      <Paper
        sx={{
          width: "100%",
          margin: "0 auto",
          padding: 10,
          mb: 2,
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
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((proveedor, index) => {
                const isItemSelected = selected.indexOf(proveedor.prO_id) !== -1;
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, proveedor.prO_id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={proveedor.prO_id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>{`${proveedor.prO_nombre} ${proveedor.prO_apellido}`}</TableCell>
                    <TableCell>{proveedor.prO_nombre_empresa}</TableCell>
                    <TableCell>{proveedor.prO_nit}</TableCell>
                    <TableCell>{proveedor.prO_correo_electronico}</TableCell>
                    <TableCell>{proveedor.prO_telefono}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(proveedor)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => {
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
                        handleDelete(proveedor.prO_id).then(() => {
                          Swal.fire({
                            title: 'Eliminado!',
                            text: 'El proveedor ha sido eliminado.',
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
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal 
      open={isModalVisible} 
      onClose={handleCloseModal}>
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
          {isEditMode ? 'Editar Proveedor' : 'Nuevo Proveedor'}
        </Typography>
        <hr />

          {isEditMode ? (
            <EditarProveedor 
            proveedor={selectedProveedor} 
            handleCloseModal={handleCloseModal} 
            refreshProveedores={obtenerProveedores}
            />
          ) : (
            <NuevoProveedor handleCloseModal={handleCloseModal}
            refreshProveedores={obtenerProveedores}/>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
