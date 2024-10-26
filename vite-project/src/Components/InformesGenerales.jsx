import React from "react";
import { Box, Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export default function InformesGenerales() {
  const navigate = useNavigate(); // Para la navegación entre rutas

  return (
    <Box className="background-container">
      

      <Grid container spacing={3} sx={{ maxWidth: 600 }}>
        {/* Informe de Seguimientos */}
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: 250, // Altura fija para mantener las tarjetas iguales
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
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
        <Grid item xs={12} sm={6}>
          <Card
            sx={{
              height: 250, // Altura fija para mantener las tarjetas iguales
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              textAlign: "center",
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
      </Grid>
    </Box>
  );
}
