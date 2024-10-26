import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Paper, TextField, Select, MenuItem,
  Button, FormControl, InputLabel, NativeSelect
} from '@mui/material';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function InformePosiblesClientes() {
  const [clientes, setClientes] = useState([]);
  const [canalesVenta, setCanalesVenta] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [filters, setFilters] = useState({
    estado: '',
    canalVenta: '',
    vendedor: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const obtenerDatos = async () => {
    try {
      const [clientesRes, canalesRes, vendedoresRes] = await Promise.all([
        fetch('https://localhost:7228/api/PosibleCliente').then((res) => res.json()),
        fetch('https://localhost:7228/api/CanalVenta').then((res) => res.json()),
        fetch('https://localhost:7228/api/Usuario').then((res) => res.json()),
      ]);

      setClientes(clientesRes);
      setFilteredClientes(clientesRes);
      setCanalesVenta(canalesRes);
      setVendedores(vendedoresRes);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const aplicarFiltros = () => {
    const { estado, canalVenta, vendedor, fechaInicio, fechaFin } = filters;

    const filtrados = clientes.filter((cliente) => {
      const fechaCliente = dayjs(cliente.fecha_registro);
      const coincideEstado = estado ? cliente.poC_estado_de_posible_cliente === estado : true;
      const coincideCanal = canalVenta ? cliente.canal_venta_id === parseInt(canalVenta) : true;
      const coincideVendedor = vendedor ? cliente.vendedor_id === parseInt(vendedor) : true;
      const coincideFechaInicio = fechaInicio ? fechaCliente.isAfter(dayjs(fechaInicio).subtract(1, 'day')) : true;
      const coincideFechaFin = fechaFin ? fechaCliente.isBefore(dayjs(fechaFin).add(1, 'day')) : true;

      return coincideEstado && coincideCanal && coincideVendedor && coincideFechaInicio && coincideFechaFin;
    });

    setFilteredClientes(filtrados);
  };

  const resetearFiltros = () => {
    setFilters({
      estado: '',
      canalVenta: '',
      vendedor: '',
      fechaInicio: '',
      fechaFin: ''
    });
    setFilteredClientes(clientes);
  };

  const exportarExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "PosiblesClientes");
    XLSX.writeFile(workbook, "informe_posibles_clientes.xlsx");
  };

  const exportarPDF = (data) => {
    const doc = new jsPDF();
    doc.text("Informe de Posibles Clientes", 10, 10);
    autoTable(doc, {
      head: [["Nombre", "NIT", "Correo", "Teléfono", "Estado"]],
      body: data.map((cliente) => [
        `${cliente.poC_nombre} ${cliente.poC_apellido}`,
        cliente.poC_nit,
        cliente.poC_correo_electronico,
        cliente.poC_telefono,
        cliente.poC_estado_de_posible_cliente,
      ]),
    });
    doc.save("informe_posibles_clientes.pdf");
  };

  return (
    <Box sx={{ width: '100%', padding: 2, backgroundColor: 'white' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <h3>Informe de Posibles Clientes</h3>
        <FormControl sx={{ width: '20%' }} size="small">
          <InputLabel variant="standard" htmlFor="exportar-select">
            Exportar
          </InputLabel>
          <NativeSelect
            inputProps={{
              name: 'exportar',
              id: 'exportar-select',
            }}
            onChange={(e) => {
              const option = e.target.value;
              if (option === 'excel-todo') exportarExcel(clientes);
              if (option === 'excel-filtrado') exportarExcel(filteredClientes);
              if (option === 'pdf-filtrado') exportarPDF(filteredClientes);
            }}
          >
            <option value=""></option>
            <option value="excel-todo">Excel (Informe Completo)</option>
            <option value="excel-filtrado">Excel (Filtrado)</option>
            <option value="pdf-filtrado">PDF (Filtrado)</option>
          </NativeSelect>
        </FormControl>
      </header>

      <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, justifyContent: 'center' }}>
        <Select
          value={filters.estado}
          onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">Todos los Estados</MenuItem>
          <MenuItem value="Prospecto">Prospecto</MenuItem>
          <MenuItem value="Cliente">Cliente</MenuItem>
          <MenuItem value="Perdido">Perdido</MenuItem>
        </Select>

        <Select
          value={filters.canalVenta}
          onChange={(e) => setFilters({ ...filters, canalVenta: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">Todos los Canales</MenuItem>
          {canalesVenta.map((canal) => (
            <MenuItem key={canal.id} value={canal.id}>
              {canal.nombre}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={filters.vendedor}
          onChange={(e) => setFilters({ ...filters, vendedor: e.target.value })}
          displayEmpty
        >
          <MenuItem value="">Todos los Vendedores</MenuItem>
          {vendedores.map((vendedor) => (
            <MenuItem key={vendedor.usU_id} value={vendedor.usU_id}>
              {vendedor.usU_nombre}
            </MenuItem>
          ))}
        </Select>

        <TextField
          type="date"
          value={filters.fechaInicio}
          onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
          InputLabelProps={{ shrink: true }}
          label="Fecha Inicio"
        />

        <TextField
          type="date"
          value={filters.fechaFin}
          onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
          InputLabelProps={{ shrink: true }}
          label="Fecha Fin"
        />

        <Button variant="contained" onClick={aplicarFiltros}>
          APLICAR FILTROS
        </Button>
        <Button variant="outlined" onClick={resetearFiltros}>
          RESET
        </Button>
      </Box>

      <Paper sx={{ width: '100%', marginTop: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>NIT</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredClientes
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((cliente) => (
                  <TableRow key={cliente.poC_id}>
                    <TableCell>{`${cliente.poC_nombre} ${cliente.poC_apellido}`}</TableCell>
                    <TableCell>{cliente.poC_nit}</TableCell>
                    <TableCell>{cliente.poC_correo_electronico}</TableCell>
                    <TableCell>{cliente.poC_telefono}</TableCell>
                    <TableCell>{cliente.poC_estado_de_posible_cliente}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredClientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>
    </Box>
  );
}
