// src/components/Dashboard.js
import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import SalesChart from './SalesChart';

const Dashboard = () => {
  // Datos de ejemplo
  const stats = [
    { title: 'Clientes Totales', value: 120 },
    { title: 'Ventas Este Mes', value: 15 },
    { title: 'Oportunidades Abiertas', value: 8 },
    { title: 'Tareas Pendientes', value: 5 },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <SalesChart /> {/* Aquí se integra el gráfico */}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
