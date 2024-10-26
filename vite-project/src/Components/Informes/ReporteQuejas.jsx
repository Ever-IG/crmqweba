import React, { useState, useEffect, useMemo } from "react";
import { ArrowBack } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  TablePagination,
} from "@mui/material";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export default function ReporteQuejas() {
  const [data, setData] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    vendedor: "",
    cliente: "",
    prioridad: "",
    estado: "",
    fechaInicio: "",
    fechaFin: "",
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const obtenerDatos = async () => {
    try {
      const [quejasRes, clientesRes, vendedoresRes] = await Promise.all([
        fetch("https://localhost:7228/api/Queja").then((res) => res.json()),
        fetch("https://localhost:7228/api/Cliente").then((res) => res.json()),
        fetch("https://localhost:7228/api/Usuario").then((res) => res.json()),
      ]);

      const processedData = quejasRes.map((queja) => {
        const cliente = clientesRes.find((c) => c.clI_id === queja.clI_id);
        const nombreCompleto = cliente
          ? `${cliente.clI_nombre} ${cliente.clI_apellido}`
          : "Cliente Desconocido";

        return { ...queja, nombre: nombreCompleto };
      });

      setData(processedData);
      setClientes(clientesRes);
      setVendedores(vendedoresRes);
      setFilteredData(processedData);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    obtenerDatos();
  }, []);

  const aplicarFiltros = () => {
    const { vendedor, cliente, prioridad, estado, fechaInicio, fechaFin } = filters;

    const filtrados = data.filter((queja) => {
      const fechaQueja = dayjs(queja.quE_fecha_queja);
      const coincideVendedor = vendedor ? queja.usU_id === parseInt(vendedor) : true;
      const coincideCliente = cliente ? queja.clI_id === parseInt(cliente) : true;
      const coincidePrioridad = prioridad ? queja.quE_prioridad === prioridad : true;
      const coincideEstado = estado ? queja.quE_estado === estado : true;
      const coincideFechaInicio = fechaInicio ? fechaQueja.isAfter(dayjs(fechaInicio).subtract(1, "day")) : true;
      const coincideFechaFin = fechaFin ? fechaQueja.isBefore(dayjs(fechaFin).add(1, "day")) : true;

      return (
        coincideVendedor &&
        coincideCliente &&
        coincidePrioridad &&
        coincideEstado &&
        coincideFechaInicio &&
        coincideFechaFin
      );
    });

    setFilteredData(filtrados);
  };

  const resetearFiltros = () => {
    setFilters({
      vendedor: "",
      cliente: "",
      prioridad: "",
      estado: "",
      fechaInicio: "",
      fechaFin: "",
    });
    setFilteredData(data);
  };

  const exportarExcel = (data) => {
    const datosConInformacionCompleta = data.map((queja) => {
      const cliente = clientes.find((c) => c.clI_id === queja.clI_id) || {};
      return {
        'ID Queja': queja.quE_id,
        'Fecha': dayjs(queja.quE_fecha_queja).format('DD-MM-YYYY'),
        'ID Agente': queja.usU_id,
        'Agente': vendedores.find((v) => v.usU_id === queja.usU_id)?.usU_nombre || 'No disponible',
        'ID Cliente': cliente.clI_id || 'No disponible',
        'Nombre del Cliente': `${cliente.clI_nombre || ''} ${cliente.clI_apellido || ''}`.trim() || 'No disponible',
        'NIT Cliente': cliente.clI_nit || 'No disponible',
        'Correo Cliente': cliente.clI_correo_electronico || '',
        'Prioridad': queja.quE_prioridad,
        'Estado': queja.quE_estado,
        'Motivo': queja.quE_motivo,
        'Descripción': queja.quE_descripcion || '',
      };
    });
  
    const worksheet = XLSX.utils.json_to_sheet(datosConInformacionCompleta);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quejas");
    XLSX.writeFile(workbook, "informe_quejas_completo.xlsx");
  };

  const navigate = useNavigate(); 
  

  return (
    <Box sx={{ width: "100%", backgroundColor: "white", padding: 2 }}>
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
        <h3>Informe de Quejas</h3>
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
                if (option === 'excel-todo') exportarExcel(data);
                if (option === 'excel-filtrado') exportarExcel(filteredData);
                if (option === 'pdf-filtrado') exportarPDF(filteredData);
              }}
          >
            <option value=""></option>
            <option value="excel-todo">Excel (Informe Completo)</option>
            <option value="excel">Excel (Filtrado)</option>
            <option value="pdf">PDF (Filtrado)</option>
          </NativeSelect>
        </FormControl>
      </header>

      <Box sx={{ display: "flex", gap: 2, marginBottom: 2, justifyContent: "center" }}>
        <Select
          name="vendedor"
          value={filters.vendedor}
          onChange={(e) => setFilters({ ...filters, vendedor: e.target.value })}
          displayEmpty
           sx={{ width: '150px' }}
        >
          <MenuItem value="">Todos los Vendedores</MenuItem>
          {vendedores.map((v) => (
            <MenuItem key={v.usU_id} value={v.usU_id}>
              {v.usU_nombre}
            </MenuItem>
          ))}
        </Select>

        <Select
          name="cliente"
          value={filters.cliente}
          onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
          displayEmpty
           sx={{ width: '150px' }}
        >
          <MenuItem value="">Todos los Clientes</MenuItem>
          {clientes.map((c) => (
            <MenuItem key={c.clI_id} value={c.clI_id}>
              {c.clI_nombre} {c.clI_apellido}
            </MenuItem>
          ))}
        </Select>

        <TextField
          name="fechaInicio"
          type="date"
          label="Fecha Inicio"
          sx={{ width: '150px' }}
          InputLabelProps={{ shrink: true }}
          value={filters.fechaInicio}
          onChange={(e) => setFilters({ ...filters, fechaInicio: e.target.value })}
        />

        <TextField
          name="fechaFin"
          type="date"
          label="Fecha Fin"
          sx={{ width: '150px' }}
          InputLabelProps={{ shrink: true }}
          value={filters.fechaFin}
          onChange={(e) => setFilters({ ...filters, fechaFin: e.target.value })}
        />

        <Select
            name="prioridad"
            value={filters.prioridad}
            onChange={(e) => setFilters({ ...filters, prioridad: e.target.value })}
            displayEmpty
             sx={{ width: '150px' }}
            >
            <MenuItem value="">Todas las Prioridades</MenuItem>
            <MenuItem value="Baja">Baja</MenuItem>
            <MenuItem value="Media">Media</MenuItem>
            <MenuItem value="Alta">Alta</MenuItem>
        </Select>

        <Select

            name="estado"
            value={filters.estado}
            onChange={(e) => setFilters({ ...filters, estado: e.target.value })}
            displayEmpty
             sx={{ width: '150px' }}
            >
            <MenuItem value="">Todos los Estados</MenuItem>
            <MenuItem value="Capturada">Capturada</MenuItem>
            <MenuItem value="Escalada">Escalada</MenuItem>
            <MenuItem value="Cerrada">Cerrada</MenuItem>
        </Select>



        <Button variant="contained"  sx={{ width: '150px' }} onClick={aplicarFiltros}>
          Aplicar Filtros
        </Button>
        <Button variant="outlined"  sx={{ width: '150px' }} onClick={resetearFiltros}>
          Resetear
        </Button>
      </Box>

      <Paper sx={{ width: "100%", marginTop: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Prioridad</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Motivo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((q) => (
                <TableRow key={q.quE_id}>
                  <TableCell>{dayjs(q.quE_fecha_queja).format("DD-MM-YYYY")}</TableCell>
                  <TableCell>{q.nombre}</TableCell>
                  <TableCell>{q.quE_prioridad}</TableCell>
                  <TableCell>{q.quE_estado}</TableCell>
                  <TableCell>{q.quE_motivo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Paper>
    </Box>
  );
}
