import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Modal, TextField, Select, MenuItem } from '@mui/material';

const PClienteReporte = () => {
  const [posiblesClientes, setPosiblesClientes] = useState([]);
  const [modalOpen, setModalOpen] = useState(null);
  const [filtroFecha, setFiltroFecha] = useState({ desde: '', hasta: '' });
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroFuente, setFiltroFuente] = useState('');
  const [filtroRegion, setFiltroRegion] = useState('');

  // Simula la obtención de datos de la API
  useEffect(() => {
    const fetchPosiblesClientes = async () => {
      try {
        // Reemplaza esta URL por tu API real
        const response = await fetch('/api/posiblesClientes');
        const data = await response.json();
        setPosiblesClientes(data);
      } catch (error) {
        console.error('Error al obtener los posibles clientes:', error);
      }
    };

    fetchPosiblesClientes();
  }, []);

  // Función para abrir el modal correspondiente
  const openModal = (modalType) => {
    setModalOpen(modalType);
  };

  // Función para cerrar cualquier modal abierto
  const closeModal = () => {
    setModalOpen(null);
  };

  // Simulación de la función de filtros
  const applyFilters = () => {
    let filtered = posiblesClientes;

    // Filtro por fecha
    if (filtroFecha.desde && filtroFecha.hasta) {
      filtered = filtered.filter(cliente =>
        new Date(cliente.fecha) >= new Date(filtroFecha.desde) && new Date(cliente.fecha) <= new Date(filtroFecha.hasta)
      );
    }

    // Filtro por estado
    if (filtroEstado) {
      filtered = filtered.filter(cliente => cliente.POC_estado_de_posible_cliente === filtroEstado);
    }

    // Filtro por fuente y región
    if (filtroFuente) {
      filtered = filtered.filter(cliente => cliente.POC_fuente_de_posible_cliente === filtroFuente);
    }
    if (filtroRegion) {
      filtered = filtered.filter(cliente => cliente.POC_departamento === filtroRegion);
    }

    return filtered;
  };

  return (
    <div>
      {/* Contenedor con estilo flex para colocar el título y los botones en una sola línea */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1>Reporte de Posibles Clientes</h1>

        {/* Botones para abrir los modales */}
        <div>
          <Button onClick={() => openModal('filtroFecha')} style={{ marginRight: '10px' }}>Filtrar por Fecha</Button>
          <Button onClick={() => openModal('filtroEstado')} style={{ marginRight: '10px' }}>Filtrar por Estado</Button>
          <Button onClick={() => openModal('filtroFuenteRegion')} style={{ marginRight: '10px' }}>Filtrar por Fuente y Región</Button>
        </div>
      </div>

      {/* Tabla de posibles clientes */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Empresa</TableCell>
            <TableCell>NIT</TableCell>
            <TableCell>Correo Electrónico</TableCell>
            <TableCell>Teléfono</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Canal de Venta</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applyFilters().map((row) => (
            <TableRow key={row.POC_id}>
              <TableCell>{row.POC_nombre} {row.POC_apellido}</TableCell>
              <TableCell>{row.POC_empresa}</TableCell>
              <TableCell>{row.POC_nit}</TableCell>
              <TableCell>{row.POC_correo_electronico}</TableCell>
              <TableCell>{row.POC_telefono}</TableCell>
              <TableCell>{row.POC_estado_de_posible_cliente}</TableCell>
              <TableCell>{row.CVE_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal de Filtro por Fecha */}
      {modalOpen === 'filtroFecha' && (
        <Modal open={true} onClose={closeModal}>
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h2>Filtrar por Fecha</h2>
            <TextField
              label="Desde"
              type="date"
              value={filtroFecha.desde}
              onChange={(e) => setFiltroFecha({ ...filtroFecha, desde: e.target.value })}
              InputLabelProps={{ shrink: true }}
              style={{ marginRight: '10px' }}
            />
            <TextField
              label="Hasta"
              type="date"
              value={filtroFecha.hasta}
              onChange={(e) => setFiltroFecha({ ...filtroFecha, hasta: e.target.value })}
              InputLabelProps={{ shrink: true }}
            />
            <Button onClick={closeModal} style={{ marginTop: '20px' }}>Aplicar Filtro</Button>
          </div>
        </Modal>
      )}

      {/* Modal de Filtro por Estado */}
      {modalOpen === 'filtroEstado' && (
        <Modal open={true} onClose={closeModal}>
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h2>Filtrar por Estado</h2>
            <Button onClick={() => { setFiltroEstado('Cliente'); closeModal(); }} style={{ marginRight: '10px' }}>Cliente</Button>
            <Button onClick={() => { setFiltroEstado('Prospecto'); closeModal(); }}>Prospecto</Button>
          </div>
        </Modal>
      )}

      {/* Modal de Filtro por Fuente y Región */}
      {modalOpen === 'filtroFuenteRegion' && (
        <Modal open={true} onClose={closeModal}>
          <div style={{ padding: '20px', backgroundColor: 'white' }}>
            <h2>Filtrar por Fuente y Región</h2>
            <Select
              label="Fuente de Posible Cliente"
              value={filtroFuente}
              onChange={(e) => setFiltroFuente(e.target.value)}
              style={{ marginRight: '10px' }}
            >
              <MenuItem value="Web">Web</MenuItem>
              <MenuItem value="Referido">Referido</MenuItem>
              <MenuItem value="Publicidad">Publicidad</MenuItem>
            </Select>
            <Select
              label="Región"
              value={filtroRegion}
              onChange={(e) => setFiltroRegion(e.target.value)}
            >
              <MenuItem value="Ciudad">Ciudad</MenuItem>
              <MenuItem value="Departamento">Departamento</MenuItem>
            </Select>
            <Button onClick={closeModal} style={{ marginTop: '20px' }}>Aplicar Filtro</Button>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default PClienteReporte;
