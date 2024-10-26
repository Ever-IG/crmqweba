import React, { useEffect, useState, useRef } from "react";
import { ArrowBack } from "@mui/icons-material"; 
import {
  Avatar,
  Typography,
  Grid,
  CircularProgress,
  Divider,
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
  PersonAdd,
  Block,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate, useParams, Link  } from "react-router-dom";
import Swal from "sweetalert2";
import ConvertirPaC from "./ConvertirPaC";
import PerdidoPoc from "./Perdido.PoC";
import EditarPosibleCliente from "./EditarPosibleCliente";
import { data } from "autoprefixer";

const DetallePosibleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);
  const [canalVenta, setCanalVenta] = useState(""); // Estado para el nombre del canal de venta
  const [usuario, setUsuario] = useState(""); // Estado para el nombre del usuario
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const confirmarPerdidoRef = useRef(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(
          `https://localhost:7228/api/PosibleCliente/${id}`
        );
        const data = await response.json();
        setCliente(data);
        await fetchCanalVenta(data.cvE_id);
        await fetchUsuario(data.usU_id);
      } catch (error) {
        console.error("Error al cargar el cliente:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  const fetchCanalVenta = async (canalId) => {
    try {
      const response = await fetch(
        `https://localhost:7228/api/CanalVenta/${canalId}`
      );
      const data = await response.json();
      setCanalVenta(data.cvE_nombre); // Asumiendo que la API devuelve { nombre: '...' }
    } catch (error) {
      console.error("Error al cargar el canal de venta:", error);
    }
  };

  const fetchUsuario = async (usuarioId) => {
    try {
      const response = await fetch(
        `https://localhost:7228/api/Usuario/${usuarioId}`
      );
      const data = await response.json();
      setUsuario(data.usU_nombre); // Asumiendo que la API devuelve { nombre: '...' }
    } catch (error) {
      console.error("Error al cargar el usuario:", error);
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminarlo!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `https://localhost:7228/api/PosibleCliente/${id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          await Swal.fire(
            "¡Eliminado!",
            "El posible cliente ha sido eliminado.",
            "success"
          );
          navigate("/PosibleCliente"); // Redirige a la vista deseada
        } else {
          throw new Error("No se pudo eliminar el posible cliente.");
        }
      } catch (error) {
        console.error("Error al eliminar el posible cliente:", error);
        Swal.fire(
          "Error",
          "Hubo un problema al eliminar el posible cliente.",
          "error"
        );
      }
    }
  };

  const handleEdit = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleClienteConvertido = () => {
    ConvertirPaC({
      posibleCliente: cliente,
      onClienteConvertido: () => navigate("/PosiblesClientes"),
    });
  };

  const handleClientePerdido = () => {
    if (confirmarPerdidoRef.current) {
      confirmarPerdidoRef.current().then(() => {
        navigate('/PosibleCliente'); // Redirige tras completar la acción
      }).catch((error) => {
        console.error('Error al marcar como perdido:', error);
        Swal.fire('Error', 'Hubo un problema al marcar como perdido.', 'error');
      });
    }
  };
  

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!cliente) return <Typography>No se encontró el cliente</Typography>;

  return (
    <Box sx={{ minHeight: "100vh", paddingTop: "80px" }}>
      {/* Header Fijo */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#001529", zIndex: 900, marginTop: "40px" }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            startIcon={<Edit />}
            color="inherit"
            onClick={handleEdit}
            sx={{ marginRight: 2 }}
          >
            Editar
          </Button>
          <Button
            startIcon={<Delete />}
            color="inherit"
            onClick={handleDelete}
            sx={{ marginRight: 2 }}
          >
            Eliminar
          </Button>
          <Button
            startIcon={<PersonAdd />}
            color="inherit"
            onClick={handleClienteConvertido}
            sx={{ marginRight: 2 }}
          >
            Convertir en Cliente
          </Button>
          <Button
            startIcon={<Block />}
            color="inherit"
            onClick={handleClientePerdido}
          >
            Perdido
          </Button>
        </Toolbar>
      </AppBar>

      <Box
    sx={{
      display: "flex",
      justifyContent: "flex-start", // Alineado a la izquierda
      alignItems: "center",
      padding: "16px", // Margen para separarlo del header
    }}
  >
    <Link to="/PosibleCliente" style={{ textDecoration: "none"}}>
      <Button variant="outlined" color="primary" startIcon={<ArrowBack />}>
        Volver 
      </Button>
    </Link>
  </Box>

      {/* Contenido Principal */}
      <Grid container spacing={3} maxWidth={600} margin="auto">
        {/* Información General */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
                <Avatar
                  alt={`${cliente.poC_nombre} ${cliente.poC_apellido}`}
                  src={cliente.poC_imagenurl}
                  sx={{ width: 64, height: 64 }}
                />
                <Typography variant="h5">
                  {cliente.poC_nombre} {cliente.poC_apellido}
                </Typography>
              </Box>
              <Divider />
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Empresa:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_empresa}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">NIT:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_nit}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">DPI:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_dpi}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Dirección */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Dirección
              </Typography>
              <Divider />
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Dirección:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_direccion}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Departamento:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_departamento}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Municipio:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_municipio}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Código Postal:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_codigo_postal}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">País:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_pais}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Información Adicional */}
        <Grid item xs={12}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Información Adicional
              </Typography>
              <Divider />
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">
                    Correo Secundario:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {cliente.poC_correo_electronico_secundario}
                  </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">
                    Teléfono Secundario:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{cliente.poC_telefono_secundario}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Canal de Venta:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{canalVenta}</Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Fecha:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>
                    {new Date(cliente.poC_fecha).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={4} align="right">
                  <Typography variant="subtitle1">Vendedor:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{usuario}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <PerdidoPoc
        posibleCliente={cliente}
        onClientePerdido={(id) => navigate("/PosibleCliente")}
        onConfirmarPerdidoExternamente={(fn) =>
          (confirmarPerdidoRef.current = fn)
        }
      />

      {/* Modal para Editar Cliente */}
      <Modal open={showModal} onClose={handleCloseModal}>
  <Box
    sx={{
      padding: 3,
      backgroundColor: "white",
      width: 600,
      margin: "100px auto",
      marginTop: 1,
      position: "relative",
      borderRadius: 4,
      boxShadow: 24,
      maxHeight: "100vh",
      overflowY: "auto",
    }}
  >
    <IconButton
      aria-label="close"
      onClick={handleCloseModal}
      sx={{ position: "absolute", right: 8, top: 8 }}
    >
      <CloseIcon />
    </IconButton>
    <Typography variant="h6" component="h2">
      Editar Posible Cliente
    </Typography>
    {cliente && (
      <EditarPosibleCliente
        posiblecliente={cliente}
        handleUpdate={(id, updatedCliente) => {
          // Lógica para actualizar el cliente en la lista o vista principal
          setCliente(updatedCliente); // Actualiza el estado del cliente en el componente principal
          handleCloseModal(); // Cierra el modal
        }}
        handleClose={handleCloseModal}
      />
    )}
  </Box>
</Modal>

    </Box>
  );
};

export default DetallePosibleCliente;
