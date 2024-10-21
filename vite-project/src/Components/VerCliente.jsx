import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Paper,
  Checkbox,
  IconButton,
  Button,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { visuallyHidden } from "@mui/utils";
import EditarCliente from "./EditarCliente"; // Componente de edición

const headCells = [
  {
    id: "nombre_completo",
    numeric: false,
    disablePadding: true,
    label: "Nombre Completo",
  },
  {
    id: "clI_empresa",
    numeric: false,
    disablePadding: false,
    label: "Empresa",
  },
  { id: "clI_nit", numeric: false, disablePadding: false, label: "NIT" },
  {
    id: "clI_correo_electronico",
    numeric: false,
    disablePadding: false,
    label: "Correo Electrónico",
  },
  {
    id: "clI_telefono",
    numeric: false,
    disablePadding: false,
    label: "Teléfono",
  },
  { id: "acciones", numeric: false, disablePadding: false, label: "Acciones" },
];

function VerCliente() {
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("nombre_completo");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch("https://localhost:7228/api/Cliente");
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error("Error al obtener clientes:", error);
      }
    };
    fetchClientes();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleEdit = (cliente) => {
    setSelectedCliente(cliente);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`https://localhost:7228/api/Cliente/${id}`, {
            method: "DELETE",
          });
          setClientes(clientes.filter((cliente) => cliente.clI_id !== id));
          Swal.fire("¡Eliminado!", "El cliente ha sido eliminado.", "success");
        } catch (error) {
          console.error("Error al eliminar cliente:", error);
        }
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCliente(null);
  };

  const handleUpdate = (id, updatedCliente) => {
    setClientes((prevClientes) =>
      prevClientes.map((cliente) =>
        cliente.clI_id === id ? updatedCliente : cliente
      )
    );
    handleCloseModal();
  };

  const visibleRows = [...clientes]
    .sort((a, b) => {
      if (orderBy === "nombre_completo") {
        const nombreCompletoA = `${a.clI_nombre} ${a.clI_apellido}`;
        const nombreCompletoB = `${b.clI_nombre} ${b.clI_apellido}`;
        return order === "asc"
          ? nombreCompletoA.localeCompare(nombreCompletoB)
          : nombreCompletoB.localeCompare(nombreCompletoA);
      } else {
        return order === "asc"
          ? a[orderBy].localeCompare(b[orderBy])
          : b[orderBy].localeCompare(a[orderBy]);
      }
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box sx={{ width: "100%" }}>
      <header className="header-vista">
        <h3 className="header-title">Clientes</h3>
        <Button
          className="nuevo-btn"
          type="primary"
          onClick={() => navigate("/NuevoCliente")}
          style={{ backgroundColor: "#8E0D3C", color: "#ffffff" }}
        >
          Nuevo
        </Button>
      </header>

      <Paper sx={{ width: "100%", margin: "0 auto", padding: 10 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selected.length > 0 && selected.length < clientes.length
                    }
                    checked={
                      clientes.length > 0 && selected.length === clientes.length
                    }
                    onChange={(e) =>
                      setSelected(
                        e.target.checked ? clientes.map((n) => n.clI_id) : []
                      )
                    }
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    sortDirection={orderBy === headCell.id ? order : false}
                    sx={{ width: 200 }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(e) => handleRequestSort(e, headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((cliente) => (
                <TableRow key={cliente.clI_id}>
                  <TableCell padding="checkbox">
                    <Checkbox checked={selected.includes(cliente.clI_id)} />
                  </TableCell>
                  <TableCell>{`${cliente.clI_nombre} ${cliente.clI_apellido}`}</TableCell>
                  <TableCell>{cliente.clI_empresa}</TableCell>
                  <TableCell>{cliente.clI_nit}</TableCell>
                  <TableCell>{cliente.clI_correo_electronico}</TableCell>
                  <TableCell>{cliente.clI_telefono}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(cliente)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(cliente.clI_id)}>
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
          count={clientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) =>
            setRowsPerPage(parseInt(e.target.value, 10))
          }
          labelRowsPerPage="Filas por página:"
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
    <IconButton onClick={handleCloseModal} sx={{ position: 'absolute', right: 8, top: 8 }}>
      <CloseIcon />
    </IconButton>
    <Typography variant="h6">Editar Cliente</Typography>
    <hr />
    {selectedCliente && (
      <EditarCliente 
        show={showModal} 
        cliente={selectedCliente} 
        handleUpdate={handleUpdate} 
        handleClose={handleCloseModal} 
      />
    )}
  </Box>
</Modal>

    </Box>
  );
}

export default VerCliente;
