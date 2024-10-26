import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function InformesGenerales() {
  const navigate = useNavigate(); // Para la navegación entre rutas

  return (
    <Box
      className="background-container"
      sx={{
        height: '100vh',  // Altura exacta de la pantalla
        display: 'flex',
        justifyContent: 'center',
        overflow: 'hidden',  // Evita el scroll
        boxSizing: 'border-box',  // Asegura que padding no exceda el tamaño del contenedor
        p: 5,  // Padding para separación interna
      }}
    >
      <Grid 
        container 
        spacing={3} 
        sx={{ maxWidth: 1200, width: '100%' }} // Ancho ajustado y centrado
      >
        {/* Informe de Seguimientos */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Informe de Seguimientos
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualiza y exporta el informe completo de los seguimientos registrados.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/Informes/ReporteSeguimiento")}
            >
              Ver Informe
            </Button>
          </Card>
        </Grid>

        {/* Informe de Quejas */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Informe de Quejas
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualiza y exporta el informe completo de las quejas registradas.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/Informes/ReporteQuejas")}
            >
              Ver Informe
            </Button>
          </Card>
        </Grid>

        {/* Informe de Posibles Clientes */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 250,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              padding: 2,
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Informe de Posibles Clientes
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visualiza y exporta el informe completo de los posibles clientes registrados.
              </Typography>
            </CardContent>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#406a77',  // Color personalizado
                '&:hover': {
                  backgroundColor: '#305563',  // Color al pasar el mouse
                },
              }}
              onClick={() => navigate("/PClienteReporte")}
            >
              Ver Informe
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
