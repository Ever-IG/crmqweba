import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  IconButton,
  Modal,
  Tooltip,
  TablePagination,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import dayjs from "dayjs";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import ModalQueja from "./ModalQueja";
import NuevaQueja from "./NuevaQueja";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Chip } from "@mui/material";

function descendingComparator(a, b, orderBy) {
  if (orderBy === "quE_fecha_queja") {
    const dateA = dayjs(a[orderBy]);
    const dateB = dayjs(b[orderBy]);
    if (dateB.isBefore(dateA)) return -1;
    if (dateB.isAfter(dateA)) return 1;
    return 0;
  }
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "quE_fecha_queja",
    numeric: false,
    disablePadding: false,
    label: "Fecha de la Queja",
  },
  { id: "nombre", numeric: false, disablePadding: true, label: "Cliente" },
  {
    id: "quE_prioridad",
    numeric: false,
    disablePadding: false,
    label: "Prioridad",
  },
  { id: "quE_estado", numeric: false, disablePadding: false, label: "Estado" },

  { id: "quE_motivo", numeric: false, disablePadding: false, label: "Motivo" },
  /*{
    id: "quE_descripcion",
    numeric: false,
    disablePadding: false,
    label: "Descripción",
  },*/
  { id: "acciones", numeric: false, disablePadding: false, label: "Acciones" },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
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
                  {order === "desc"
                    ? "Ordenado Descendente"
                    : "Ordenado Ascendente"}
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
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;
  return (
    <Toolbar
      sx={[
        { pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Todas las Quejas
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

export default function VerQueja() {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("quE_fecha_queja");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedQueja, setSelectedQueja] = useState(null);

  const handleNew = () => {
    setIsEditMode(false);
    setSelectedQueja(null);
    setShowModal(true);
  };

  const handleEdit = (queja) => {
    setIsEditMode(true);
    setSelectedQueja(queja);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQueja(null);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setData((prevData) => prevData.filter((q) => q.quE_id !== id));
        Swal.fire("¡Eliminado!", "La queja ha sido eliminada.", "success");
      }
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseQuejas, responseClientes] = await Promise.all([
          fetch("https://localhost:7228/api/Queja"),
          fetch("https://localhost:7228/api/Cliente"),
        ]);

        const [quejasData, clientesData] = await Promise.all([
          responseQuejas.json(),
          responseClientes.json(),
        ]);

        const processedData = quejasData.map((queja) => {
          const cliente = clientesData.find((c) => c.clI_id === queja.clI_id);
          const nombreCompleto = cliente
            ? `${cliente.clI_nombre} ${cliente.clI_apellido}`
            : "Cliente Desconocido";

          return { ...queja, nombre: nombreCompleto };
        });

        setData(processedData);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const visibleRows = useMemo(() => {
    const sortedData = [...data].sort(getComparator(order, orderBy));
    return sortedData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [order, orderBy, page, rowsPerPage, data]);

  return (
    <Box sx={{ width: "100%" }}>
      <header className="header-vista">
        <h3 className="header-title">Quejas</h3>
        <Button
          className="nuevo-btn"
          variant="contained"
          onClick={handleNew}
          style={{ backgroundColor: "#8E0D3C", color: "#ffffff" }}
        >
          Nuevo
        </Button>
      </header>

      <Paper sx={{ width: "100%", margin: "0 auto", mb: 1, padding: 10 }}>
        {/* Barra de herramientas */}
        <EnhancedTableToolbar numSelected={selected.length} />

        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-label="Quejas">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) =>
                setSelected(e.target.checked ? data.map((n) => n.quE_id) : [])
              }
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />

            <TableBody>
              {visibleRows.map((row) => (
                <TableRow
                  key={row.quE_id}
                  selected={selected.includes(row.quE_id)}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(row.quE_id)}
                      onChange={(e) => {
                        const selectedIndex = selected.indexOf(row.quE_id);
                        let newSelected = [];

                        if (selectedIndex === -1) {
                          newSelected = newSelected.concat(
                            selected,
                            row.quE_id
                          );
                        } else if (selectedIndex === 0) {
                          newSelected = newSelected.concat(selected.slice(1));
                        } else if (selectedIndex === selected.length - 1) {
                          newSelected = newSelected.concat(
                            selected.slice(0, -1)
                          );
                        } else if (selectedIndex > 0) {
                          newSelected = newSelected.concat(
                            selected.slice(0, selectedIndex),
                            selected.slice(selectedIndex + 1)
                          );
                        }

                        setSelected(newSelected);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {row.quE_fecha_queja
                      ? dayjs(row.quE_fecha_queja).format("DD-MM-YYYY")
                      : "Fecha no disponible"}
                  </TableCell>
                  <TableCell>{row.nombre}</TableCell>
                  <TableCell>
                    <Chip
                      label={row.quE_prioridad}
                      sx={{
                        backgroundColor: (() => {
                          const prioridad = row.quE_prioridad.trim().toLowerCase();
                          if (prioridad === "alta") return "#FFCDD2"; // Rojo claro
                          if (prioridad === "media") return "#FFE082"; // Amarillo claro
                          if (prioridad === "baja") return "#C8E6C9"; // Verde claro
                          return "#E0E0E0"; // Gris claro por defecto (prioridad desconocida)
                        })(),
                        color: (() => {
                          const prioridad = row.quE_prioridad.trim().toLowerCase();
                          if (prioridad === "alta") return "#D32F2F"; // Rojo oscuro
                          if (prioridad === "media") return "#F9A825"; // Amarillo oscuro
                          if (prioridad === "baja") return "#388E3C"; // Verde oscuro
                          return "#757575"; // Gris oscuro por defecto
                        })(),
                        fontWeight: "bold",
                        width: "100px", // Asegura un ancho uniforme
                        textAlign: "center",
                      }}  
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.quE_estado}
                      sx={{
                        backgroundColor: (() => {
                          const estado = row.quE_estado.trim().toLowerCase();
                          if (estado === "capturada") return "#FFCDD2"; // Rojo claro
                          if (estado === "escalada") return "#FFE082"; // Amarillo claro
                          if (estado === "cerrada") return "#C8E6C9"; // Verde claro
                          return "#E0E0E0"; // Gris claro por defecto (estado desconocido)
                        })(),
                        color: (() => {
                          const estado = row.quE_estado.trim().toLowerCase();
                          if (estado === "capturada") return "#D32F2F"; // Rojo oscuro
                          if (estado === "escalada") return "#F9A825"; // Amarillo oscuro
                          if (estado === "cerrada") return "#388E3C"; // Verde oscuro
                          return "#757575"; // Gris oscuro por defecto
                        })(),
                        fontWeight: "bold",
                        width: "100px", // Asegura un ancho uniforme
                        textAlign: "center",
                      }}
                    />
                  </TableCell>

                  <TableCell>{row.quE_motivo}</TableCell>
                  {/*<TableCell>{row.quE_descripcion}</TableCell>*/}
                  <TableCell>
                    <Tooltip title="Editar">
                      <IconButton onClick={() => handleEdit(row)}>
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton onClick={() => handleDelete(row.quE_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
        />
      </Paper>

      <Modal open={showModal} onClose={handleCloseModal}>
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
            onClick={handleCloseModal}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2">
            {isEditMode ? "Editar Queja" : "Nueva Queja"}
          </Typography>

          {isEditMode ? (
            <ModalQueja
              show={showModal}
              handleClose={handleCloseModal}
              queja={selectedQueja}
              handleUpdate={(id, updatedQueja) => {
                setData((prevData) =>
                  prevData.map((q) => (q.quE_id === id ? updatedQueja : q))
                );
                handleCloseModal();
              }}
            />
          ) : (
            <NuevaQueja handleClose={handleCloseModal} />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
