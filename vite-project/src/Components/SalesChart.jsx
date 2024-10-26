// src/components/SalesChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesChart = ({ dataValues }) => {
  const data = {
    labels: ['Posibles Clientes', 'Clientes', 'Quejas', 'Cotizaciones', 'Seguimientos' ],
    datasets: [
      {
        label: 'Resumen de Totales',
        data: dataValues,
        backgroundColor: ['#94de8c', '#48a1ff', '#fc5d2d', '#ffd65d', '#e1005e'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'TOTALES EN EL MES' },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesChart;