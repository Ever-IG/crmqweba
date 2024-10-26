// DetallePosibleCliente.jsx
import React, { useEffect, useState } from 'react';
import { 
  Avatar, Typography, Grid, CircularProgress, Divider, Box, Card, CardContent, CardActions 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const lightTheme = createTheme({ palette: { mode: 'light' } });

const Item = styled(Card)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  padding: theme.spacing(2),
}));

const ColoredCard = styled(Box)(({ theme }) => ({
  backgroundColor: '#406a77',
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const DetallePosibleCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch(`https://localhost:7228/api/PosibleCliente/${id}`);
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error('Error al cargar el cliente:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCliente();
  }, [id]);

  if (loading)
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

  if (!cliente) return <Typography>No se encontró el cliente</Typography>;

  return (
    <ThemeProvider theme={lightTheme}>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 3,
        }}
      >
        <Grid container spacing={3} maxWidth={800}>
          <Grid item xs={12}>
            
            <Item elevation={3}>
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
                <Typography variant="subtitle1" color="textSecondary" marginTop={2}>
                  Empresa: {cliente.poC_empresa}
                </Typography>
                <Typography>NIT: {cliente.poC_nit}</Typography>
                <Typography>DPI: {cliente.poC_dpi}</Typography>
                <Typography>Estado: {cliente.poC_estado_de_posible_cliente}</Typography>
                <Typography>Fuente: {cliente.poC_fuente_de_posible_cliente}</Typography>
              </CardContent>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Dirección
                </Typography>
                <Divider />
                <Typography>Dirección: {cliente.poC_direccion}</Typography>
                <Typography>Departamento: {cliente.poC_departamento}</Typography>
                <Typography>Municipio: {cliente.poC_municipio}</Typography>
                <Typography>Código Postal: {cliente.poC_codigo_postal}</Typography>
                <Typography>País: {cliente.poC_pais}</Typography>
              </CardContent>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item elevation={3}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Información Adicional
                </Typography>
                <Divider />
                <Typography>Correo: {cliente.poC_correo_electronico}</Typography>
                <Typography>Correo Secundario: {cliente.poC_correo_electronico_secundario}</Typography>
                <Typography>Teléfono: {cliente.poC_telefono}</Typography>
                <Typography>Teléfono Secundario: {cliente.poC_telefono_secundario}</Typography>
                <Typography>Canal de Venta (ID): {cliente.cvE_id}</Typography>
                <Typography>Fecha: {new Date(cliente.poC_fecha).toLocaleDateString()}</Typography>
                <Typography>Usuario (ID): {cliente.usU_id}</Typography>
              </CardContent>
              <CardActions>
                <Typography color="textSecondary" variant="caption">
                  Imagen: {cliente.poC_imagenurl ? 'URL válida' : 'No disponible'}
                </Typography>
              </CardActions>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default DetallePosibleCliente;
