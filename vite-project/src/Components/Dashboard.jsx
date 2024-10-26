import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import SalesChart from './SalesChart';

const Dashboard = () => {
  const [clientesTotales, setClientesTotales] = useState(0);
  const [quejasTotales, setQuejasTotales] = useState(0);
  const [cotizacionesTotales, setCotizacionesTotales] = useState(0);
  const [posiblesclientesTotales, setPosiblesClientesTotales] = useState(0);
  const [seguimientosTotales, setSeguimientosTotales] = useState(0);

  const API_URLS = {
    clientes: 'https://localhost:7228/api/Cliente',
    quejas: 'https://localhost:7228/api/Queja',
    cotizaciones: 'https://localhost:7228/api/Cotizacion',
    posiblesClientes: 'https://localhost:7228/api/PosibleCliente',
    seguimientos: 'https://localhost:7228/api/Seguimiento'
  };

  const fetchData = async (url, setFunction) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Error al obtener datos de ${url}`);
      const data = await response.json();
      setFunction(data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(API_URLS.clientes, setClientesTotales);
    fetchData(API_URLS.quejas, setQuejasTotales);
    fetchData(API_URLS.cotizaciones, setCotizacionesTotales);
    fetchData(API_URLS.posiblesClientes, setPosiblesClientesTotales);
    fetchData(API_URLS.seguimientos, setSeguimientosTotales);
  }, []);

  const dataValues = [
    posiblesclientesTotales,
    clientesTotales,
    quejasTotales,
    cotizacionesTotales,
    seguimientosTotales,
  ];

  const stats = [
    { title: 'Posibles Clientes Totales', value: posiblesclientesTotales },
    { title: 'Clientes Totales', value: clientesTotales },
    { title: 'Quejas Totales', value: quejasTotales },
    { title: 'Cotizaciones Totales', value: cotizacionesTotales },
    { title: 'Seguimientos', value: seguimientosTotales }
  ];

  return (
    <div className="card-container" style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>Dashboard</Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item md={2.4} sm={4} xs={10} key={index}>
            <Card>
              <CardContent style={{ backgroundColor: '#9bd4f0', color: 'white' }} >
                <Typography variant="h5">{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <SalesChart dataValues={dataValues} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
