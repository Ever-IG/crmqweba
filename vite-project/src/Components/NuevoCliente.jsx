import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { TextField, MenuItem } from "@mui/material";
import DepartamentoMunicipioSelect from "./Datos/DepartamentoMunicipioSelect";

function CustomTabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function NuevoCliente() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [cliente, setCliente] = useState({
    CLI_nombre: "",
    CLI_apellido: "",
    CLI_empresa: "",
    CLI_nit: "",
    CLI_dpi: "",
    CLI_correo_electronico: "",
    CLI_telefono: "",
    CLI_correo_electronico_secundario: "",
    CLI_telefono_secundario: "",
    CLI_direccion: "",
    CLI_departamento: "",
    CLI_municipio: "",
    CLI_codigo_postal: "",
    CLI_pais: "",
    CLI_imagenurl: "",
    CVE_id: "",
    USU_id: "",
  });

  const [canalesVenta, setCanalesVenta] = useState([]);

  // Cargar datos de Canales de Venta al montar el componente
  useEffect(() => {
    fetch("https://localhost:7228/api/CanalVenta")
      .then((response) => response.json())
      .then((data) => setCanalesVenta(data))
      .catch((error) =>
        console.error("Error al cargar canales de venta:", error)
      );
  }, []);

  // Cargar usuarios
  useEffect(() => {
    fetch("https://localhost:7228/api/Usuario")
      .then((response) => response.json())
      .then((data) => setUsuarios(data)) // Asegurar que se asignen correctamente los usuarios
      .catch((error) =>
        console.error("Error al cargar los vendedores:", error)
      );
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInput = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cliente.CLI_nombre || !cliente.CLI_correo_electronico) {
      toast.error("Nombre y correo electrónico son obligatorios");
      return;
    }

    fetch("https://localhost:7228/api/Cliente", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cliente),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al agregar el cliente");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire("¡Éxito!", "Cliente agregado correctamente", "success");
        setCliente({
          CLI_nombre: "",
          CLI_apellido: "",
          CLI_empresa: "",
          CLI_nit: "",
          CLI_dpi: "",
          CLI_correo_electronico: "",
          CLI_telefono: "",
          CLI_correo_electronico_secundario: "",
          CLI_telefono_secundario: "",
          CLI_direccion: "",
          CLI_departamento: "",
          CLI_municipio: "",
          CLI_codigo_postal: "",
          CLI_pais: "",
          CLI_imagenurl: "",
          CVE_id: "",
          USU_id: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al agregar el cliente");
      });
  };

  const handleCancel = () => {
    navigate("/VerCliente");
  };

  return (
    <div className="NuevoCliente">
      <div className="form-container">
        <ToastContainer />
        <h2 className="mb-4" style={{ textAlign: "center" }}>
          Agregar Nuevo Cliente
        </h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChangeTab}
                aria-label="Tabs"
                centered
              >
                <Tab label="Información Principal" {...a11yProps(0)} />
                <Tab label="Dirección" {...a11yProps(1)} />
                <Tab label="Información Adicional" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <div className="row g-5">
                <div className="col-md-6">
                  <TextField
                    label="Nombre"
                    name="CLI_nombre"
                    value={cliente.CLI_nombre}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Apellido"
                    name="CLI_apellido"
                    value={cliente.CLI_apellido}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                  />
                </div>

                <div className="col-md-12">
                  <TextField
                    label="Empresa"
                    name="CLI_empresa"
                    value={cliente.CLI_empresa}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="NIT"
                    name="CLI_nit"
                    value={cliente.CLI_nit}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="DPI"
                    name="CLI_dpi"
                    value={cliente.CLI_dpi}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[1-9][0-9]{12}$", maxLength: 13 }}
                    error={
                      cliente.CLI_dpi &&
                      !/^[1-9][0-9]{12}$/.test(cliente.CLI_dpi)
                    }
                    helperText={
                      cliente.CLI_dpi &&
                      !/^[1-9][0-9]{12}$/.test(cliente.CLI_dpi)
                        ? "El DPI debe contener 13 dígitos y no comenzar con 0"
                        : ""
                    }
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Correo Electrónico"
                    name="CLI_correo_electronico"
                    value={cliente.CLI_correo_electronico}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                    error={
                      cliente.CLI_correo_electronico &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        cliente.CLI_correo_electronico
                      )
                    }
                    helperText={
                      cliente.CLI_correo_electronico &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        cliente.CLI_correo_electronico
                      )
                        ? "Por favor ingrese un correo electrónico válido"
                        : ""
                    }
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Teléfono"
                    name="CLI_telefono"
                    value={cliente.CLI_telefono}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[0-9]{8}$", maxLength: 8 }}
                    error={
                      cliente.CLI_telefono &&
                      !/^[0-9]{8}$/.test(cliente.CLI_telefono)
                    }
                    helperText={
                      cliente.CLI_telefono &&
                      !/^[0-9]{8}$/.test(cliente.CLI_telefono)
                        ? "El número de teléfono debe tener exactamente 8 dígitos"
                        : ""
                    }
                  />
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              <div className="row g-5">
                <div className="col-md-12">
                  <TextField
                    label="Dirección"
                    name="CLI_direccion"
                    value={cliente.CLI_direccion}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>

                <div>
                  <DepartamentoMunicipioSelect
                    formData={cliente}
                    setFormData={setCliente}
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Código Postal"
                    name="CLI_codigo_postal"
                    value={cliente.CLI_codigo_postal}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[0-9]{5}$", maxLength: 5 }}
                    error={
                      cliente.CLI_codigo_postal &&
                      !/^[0-9]{5}$/.test(cliente.CLI_codigo_postal)
                    }
                    helperText={
                      cliente.CLI_codigo_postal &&
                      !/^[0-9]{5}$/.test(cliente.CLI_codigo_postal)
                        ? "El código postal debe contener 5 dígitos"
                        : ""
                    }
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="País"
                    name="CLI_pais"
                    value={cliente.CLI_pais}
                    onChange={handleChangeInput}
                    fullWidth
                    select
                  >
                    <MenuItem value="Guatemala">Guatemala</MenuItem>
                  </TextField>
                </div>
              </div>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                    <div className="row g-5">
              <div className="col-md-6">
                <TextField
                label="Canal de Venta"
                name="CVE_id"
                value={cliente.CVE_id}
                onChange={handleChangeInput}
                required
                select
                fullWidth
                >
                  {canalesVenta.map((canal) => (
                    <MenuItem key={canal.cvE_id} value={canal.cvE_id}>
                      {canal.cvE_nombre}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              <div className="col-md-6">
                <TextField
                label="Vendedor"
                name="USU_id"
                value={cliente.USU_id}
                onChange={handleChangeInput}
                select
                fullWidth
                >
                  {usuarios.map((usuario) => (
                    <MenuItem key={usuario.usU_id} value={usuario.usU_id}>
                      {usuario.usU_nombre}
                    </MenuItem>
                  ))}
                </TextField>
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Teléfono Secundario"
                    name="CLI_telefono_secundario"
                    value={cliente.CLI_telefono_secundario}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[0-9]{8}$", maxLength: 8 }}
                    error={
                      cliente.CLI_telefono_secundario &&
                      !/^[0-9]{8}$/.test(cliente.CLI_telefono_secundario)
                    }
                    helperText={
                      cliente.CLI_telefono_secundario &&
                      !/^[0-9]{8}$/.test(cliente.CLI_telefono_secundario)
                        ? "El número de teléfono debe tener exactamente 8 dígitos"
                        : ""
                    }
                  />
                  </div>
                  <div className="col-md-6">
                  <TextField
                    label="Correo Electrónico Secundario"
                    name="CLI_correo_electronico_secundario"
                    value={cliente.CLI_correo_electronico_secundario}
                    onChange={handleChangeInput}
                    fullWidth
                    error={
                      cliente.CLI_correo_electronico_secundario &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        cliente.CLI_correo_electronico_secundario
                      )
                    }
                    helperText={
                      cliente.CLI_correo_electronico_secundario &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        cliente.CLI_correo_electronico_secundario
                      )
                        ? "Por favor ingrese un correo electrónico válido"
                        : ""
                    }
                  />
                  </div>
              </div>

            </CustomTabPanel>
          </Box>

          <div className="fixed-bottom-button">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                backgroundColoPr: "#8E0D3C",
                color: "#ffffff",
                outline: "none",
              }}
            >
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
