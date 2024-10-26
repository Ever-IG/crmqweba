import React, { useState, useEffect } from 'react';
import { ArrowBack } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Paper, TextField, Select, MenuItem, Button, 
  FormControl, InputLabel, NativeSelect
} from '@mui/material';
import dayjs from 'dayjs';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export default function ReporteSeguimiento() {
  const [seguimientos, setSeguimientos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [posiblesClientes, setPosiblesClientes] = useState([]);
  const [filteredSeguimientos, setFilteredSeguimientos] = useState([]);
  const [filters, setFilters] = useState({
    vendedor: '',
    tipoSeguimiento: '',
    tipoCliente: '',
    fechaInicio: '',
    fechaFin: ''
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const obtenerDatos = async () => {
    try {
      const [segRes, userRes, cliRes, posCliRes] = await Promise.all([
        fetch('https://localhost:7228/api/Seguimiento').then((res) => res.json()),
        fetch('https://localhost:7228/api/Usuario').then((res) => res.json()),
        fetch('https://localhost:7228/api/Cliente').then((res) => res.json()),
        fetch('https://localhost:7228/api/PosibleCliente').then((res) => res.json())
      ]);

      setSeguimientos(segRes);
      setUsuarios(userRes);
      setClientes(cliRes);
      setPosiblesClientes(posCliRes);
      setFilteredSeguimientos(segRes);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const aplicarFiltros = () => {
    const { vendedor, tipoSeguimiento, tipoCliente, fechaInicio, fechaFin } = filters;

    const filtrados = seguimientos.filter((seg) => {
      const fechaSeg = dayjs(seg.seG_fecha_seguimiento);
      const coincideVendedor = vendedor ? seg.usU_id === parseInt(vendedor) : true;
      const coincideTipo = tipoSeguimiento ? seg.seG_tipo_seguimiento.includes(tipoSeguimiento) : true;
      const coincideTipoCliente =
        tipoCliente === 'cliente' ? seg.clI_id !== null :
        tipoCliente === 'posibleCliente' ? seg.poC_id !== null :
        true;
      const coincideFechaInicio = fechaInicio ? fechaSeg.isAfter(dayjs(fechaInicio).subtract(1, 'day')) : true;
      const coincideFechaFin = fechaFin ? fechaSeg.isBefore(dayjs(fechaFin).add(1, 'day')) : true;

      return coincideVendedor && coincideTipo && coincideTipoCliente && coincideFechaInicio && coincideFechaFin;
    });

    setFilteredSeguimientos(filtrados);
  };

  const resetearFiltros = () => {
    setFilters({
      vendedor: '',
      tipoSeguimiento: '',
      tipoCliente: '',
      fechaInicio: '',
      fechaFin: ''
    });
    setFilteredSeguimientos(seguimientos);
  };

  const obtenerNombreCliente = (seguimiento) => {
    if (seguimiento.clI_id) {
      const cliente = clientes.find((c) => c.clI_id === seguimiento.clI_id);
      return cliente ? `${cliente.clI_nombre} ${cliente.clI_apellido}` : 'Cliente desconocido';
    } else if (seguimiento.poC_id) {
      const posibleCliente = posiblesClientes.find((p) => p.poC_id === seguimiento.poC_id);
      return posibleCliente ? `${posibleCliente.poC_nombre} ${posibleCliente.poC_apellido}` : 'Posible cliente desconocido';
    }
    return 'No asignado';
  };

  const exportarExcel = (data) => {
    const datosConNombreYNit = data.map((seg) => {
      const cliente = clientes.find((c) => c.clI_id === seg.clI_id) || {};
      const posibleCliente = posiblesClientes.find((p) => p.poC_id === seg.poC_id) || {};
  
      return {
        'ID de Seguimiento': seg.seG_id,
        'Número de Seguimiento': seg.seG_numero_seguimiento,
        'ID del cliente': seg.clI_id || '',
        'Nombre del Cliente': cliente.clI_nombre ? `${cliente.clI_nombre} ${cliente.clI_apellido}` : '',
        'NIT del Cliente': cliente.clI_nit || '',
        'ID del Posible Cliente': seg.poC_id || '',
        'Nombre del Posible Cliente': posibleCliente.poC_nombre ? `${posibleCliente.poC_nombre} ${posibleCliente.poC_apellido}` : '',
        'NIT del Posible Cliente': posibleCliente.poC_nit || '',
        'Tipo de Seguimiento': seg.seG_tipo_seguimiento,
        'Fecha de Seguimiento': dayjs(seg.seG_fecha_seguimiento).format('DD-MM-YYYY'),
        'Asunto': seg.seG_asunto,
        'Propósito de la Llamada': seg.seG_proposito_llamada,
        'Resultado': seg.seG_resultado,
        'Comentario': seg.seG_comentario
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(datosConNombreYNit);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Seguimientos');
    XLSX.writeFile(workbook, 'seguimientos.xlsx');
  };

  const exportarPDF = (data) => {
    const doc = new jsPDF();
    doc.text('Informe de Seguimientos', 10, 10);
    autoTable(doc, {
      head: [['Número', 'Cliente', 'Vendedor', 'Tipo', 'Fecha', 'Propósito', 'Resultado', 'Comentario']],
      body: data.map((seg) => [
        seg.seG_numero_seguimiento,
        obtenerNombreCliente(seg),
        usuarios.find((u) => u.usU_id === seg.usU_id)?.usU_nombre || 'Desconocido',
        seg.seG_tipo_seguimiento,
        dayjs(seg.seG_fecha_seguimiento).format('DD-MM-YYYY'),
        seg.seG_proposito_llamada,
        seg.seG_resultado,
        seg.seG_comentario
      ]),
    });
    doc.save('seguimientos.pdf');
  };

  const navigate = useNavigate(); 

  return (
    <Box sx={{ width: '100%', backgroundColor: 'white', padding: 2}}>
      <header
       style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "20px",
      }}
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate("/InformesGenerales")}
          sx={{ color: "black", textTransform: "none", alignSelf: "flex-start" }}
        >
          Volver
        </Button>
        <h3>Informe de Seguimientos</h3>

        <FormControl sx={{ width: '20%', margin: '0 8px' }} size="small">

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
              if (option === 'excel-todo') exportarExcel(seguimientos);
              if (option === 'excel-filtrado') exportarExcel(filteredSeguimientos);
              if (option === 'pdf-filtrado') exportarPDF(filteredSeguimientos);
            }}
          >
            <option value=""></option>
            <option value="excel-todo">Excel (Informe Completo)</option>
            <option value="excel-filtrado">Excel (Según mi Vista)</option>
            <option value="pdf-filtrado">PDF (Según mi Vista)</option>
          </NativeSelect>
        </FormControl>
      </header>

      {/* Filtros */}
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        marginBottom: 2,
         marginTop: 8, 
         justifyContent: 'center' }}>
        <Select
          name="vendedor"
          value={filters.vendedor}
          onChange={(e) => setFilters({ ...filters, vendedor: e.target.value })}
          displayEmpty
          sx={{ width: '150px' }}
        >
          <MenuItem value="">Todos los Vendedores</MenuItem>
          {usuarios.map((user) => (
            <MenuItem key={user.usU_id} value={user.usU_id}>
              {user.usU_nombre}
            </MenuItem>
          ))}
        </Select>
        <Select
  name="tipoSeguimiento"
  value={filters.tipoSeguimiento}  // Asegura que el valor se sincronice con el estado
  sx={{ width: '150px' }}
  onChange={(e) => setFilters({ ...filters, tipoSeguimiento: e.target.value })}
  displayEmpty
>
  <MenuItem value="">Todos los Tipos de Seguimiento</MenuItem>
  <MenuItem value="Llamada">Llamada</MenuItem>
  <MenuItem value="Correo">Correo</MenuItem>
  <MenuItem value="Reunión">Reunión</MenuItem>
  <MenuItem value="Visita">Visita</MenuItem>
  <MenuItem value="Otro">Otro</MenuItem>
</Select>


        <Select
          name="tipoCliente"
          value={filters.tipoCliente}
          onChange={(e) => setFilters({ ...filters, tipoCliente: e.target.value })}
          displayEmpty
          sx={{ width: '150px' }}
        >
          <MenuItem value="">Todos los Tipos de Cliente</MenuItem>
          <MenuItem value="cliente">Cliente</MenuItem>
          <MenuItem value="posibleCliente">Posible Cliente</MenuItem>
        </Select>

        <TextField
          name="fechaInicio"
          label="Fecha Inicio"
          type="date"
          sx={{ width: '150px' }}
          InputLabelProps={{ shrink: true }}
          value={filters.fechaInicio}
          onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
        />

        <TextField
          name="fechaFin"
          label="Fecha Fin"
          type="date"
          sx={{ width: '150px' }}
          InputLabelProps={{ shrink: true }}
          value={filters.fechaFin}
          onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
        />


        <Button variant="contained" onClick={aplicarFiltros} sx={{ width: '150px' }}>
          Aplicar Filtros
        </Button>
        <Button variant="outlined" onClick={resetearFiltros} sx={{ width: '150px' }}>
          Resetear
        </Button>
      </Box>

      {/* Tabla */}
      <Paper sx={{ width: '100%', marginBottom: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Número de Seguimiento</TableCell>
                <TableCell>Nombre del Cliente</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Asunto</TableCell>
                <TableCell>Propósito</TableCell>
                <TableCell>Resultado</TableCell>
                <TableCell>Comentario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSeguimientos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((seg) => (
                <TableRow key={seg.seG_id}>
                  <TableCell>{seg.seG_numero_seguimiento}</TableCell>
                  <TableCell>{obtenerNombreCliente(seg)}</TableCell>
                  <TableCell>{usuarios.find((u) => u.usU_id === seg.usU_id)?.usU_nombre || 'Desconocido'}</TableCell>
                  <TableCell>{seg.seG_tipo_seguimiento}</TableCell>
                  <TableCell>{dayjs(seg.seG_fecha_seguimiento).format('DD-MM-YYYY')}</TableCell>
                  <TableCell>{seg.seG_asunto}</TableCell>
                  <TableCell>{seg.seG_proposito_llamada}</TableCell>
                  <TableCell>{seg.seG_resultado}</TableCell>
                  <TableCell>{seg.seG_comentario}</TableCell>
                </TableRow>
              ))}
                        </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredSeguimientos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
          rowsPerPageOptions={[10, 25, 50]}
          labelRowsPerPage="Filas por página:"
        />
      </Paper>
    </Box>
  );
}

