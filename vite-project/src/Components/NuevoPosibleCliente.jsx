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

export default function NuevoPosibleCliente() {
  const [value, setValue] = useState(0);
  const [canalesVenta, setCanalesVenta] = useState([]);
  const [usuarios, setUsuarios] = useState([]); // Declarar el estado de usuarios
  const navigate = useNavigate();
  const [newPosibleCliente, setNewPosibleCliente] = useState({
    POC_nombre: "",
    POC_apellido: "",
    POC_empresa: "",
    POC_nit: "",
    POC_dpi: "",
    POC_correo_electronico: "",
    POC_telefono: "",
    POC_fuente_de_posible_cliente: "",
    POC_estado_de_posible_cliente: "Prospecto",
    POC_correo_electronico_secundario: "",
    POC_telefono_secundario: "",
    POC_direccion: "",
    POC_departamento: "",
    POC_municipio: "",
    POC_codigo_postal: "",
    POC_pais: "",
    POC_imagenurl: "",
    CVE_id: "",
    USU_id: "", // Agregar aquí el campo de usuario
  });

  // Cargar canales de venta
  useEffect(() => {
    fetch("https://localhost:7228/api/CanalVenta")
      .then((response) => response.json())
      .then((data) => setCanalesVenta(data))
      .catch((error) =>
        console.error("Error al cargar los canales de venta:", error)
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
    setNewPosibleCliente({
      ...newPosibleCliente,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPosibleCliente.POC_nombre || !newPosibleCliente.POC_correo_electronico) {
      toast.error("Nombre y correo electrónico son obligatorios");
      return;
    }

    fetch("https://localhost:7228/api/PosibleCliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPosibleCliente),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error al agregar el posible cliente");
        return response.json();
      })
      .then(() => {
        setNewPosibleCliente({
          POC_nombre: "",
          POC_apellido: "",
          POC_empresa: "",
          POC_nit: "",
          POC_dpi: "",
          POC_correo_electronico: "",
          POC_telefono: "",
          POC_fuente_de_posible_cliente: "",
          POC_estado_de_posible_cliente: "",
          POC_correo_electronico_secundario: "",
          POC_telefono_secundario: "",
          POC_direccion: "",
          POC_departamento: "",
          POC_municipio: "",
          POC_codigo_postal: "",
          POC_pais: "",
          POC_imagenurl: "",
          CVE_id: "",
          USU_id: "",
        });
        Swal.fire("¡Éxito!", "Cliente agregado correctamente", "success");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al agregar el posible cliente");
      });
  };

  const handleCancel = () => {
    navigate("/posiblecliente");
  };

  return (
    <div className="NuevoPosibleCliente">
      <div className="form-container">
        <ToastContainer />
        <h2 className="mb-4" style={{ textAlign: "center" }}>
          Agregar Posible Cliente
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
                    name="POC_nombre"
                    value={newPosibleCliente.POC_nombre}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Apellido"
                    name="POC_apellido"
                    value={newPosibleCliente.POC_apellido}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    label="Empresa"
                    name="POC_empresa"
                    value={newPosibleCliente.POC_empresa}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="NIT"
                    name="POC_nit"
                    value={newPosibleCliente.POC_nit}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="DPI"
                    name="POC_dpi"
                    value={newPosibleCliente.POC_dpi}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[1-9][0-9]{12}$", maxLength: 13 }}
                    error={
                      newPosibleCliente.POC_dpi &&
                      !/^[1-9][0-9]{12}$/.test(newPosibleCliente.POC_dpi)
                    }
                    helperText={
                      newPosibleCliente.POC_dpi &&
                      !/^[1-9][0-9]{12}$/.test(newPosibleCliente.POC_dpi)
                        ? "El DPI debe contener 13 dígitos y no comenzar con 0"
                        : ""
                    }
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Correo Electrónico"
                    name="POC_correo_electronico"
                    value={newPosibleCliente.POC_correo_electronico}
                    onChange={handleChangeInput}
                    required
                    fullWidth
                    error={
                      newPosibleCliente.POC_correo_electronico &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        newPosibleCliente.POC_correo_electronico
                      )
                    }
                    helperText={
                      newPosibleCliente.POC_correo_electronico &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        newPosibleCliente.POC_correo_electronico
                      )
                        ? "Por favor ingrese un correo electrónico válido"
                        : ""
                    }
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Teléfono"
                    name="POC_telefono"
                    value={newPosibleCliente.POC_telefono}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[0-9]{8}$", maxLength: 8 }}
                    error={
                      newPosibleCliente.POC_telefono &&
                      !/^[0-9]{8}$/.test(newPosibleCliente.POC_telefono)
                    }
                    helperText={
                      newPosibleCliente.POC_telefono &&
                      !/^[0-9]{8}$/.test(newPosibleCliente.POC_telefono)
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
                    name="POC_direccion"
                    value={newPosibleCliente.POC_direccion}
                    onChange={handleChangeInput}
                    fullWidth
                  />
                </div>

                <div>
                  <DepartamentoMunicipioSelect
                    formData={newPosibleCliente}
                    setFormData={setNewPosibleCliente}
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Código Postal"
                    name="POC_codigo_postal"
                    value={newPosibleCliente.POC_codigo_postal}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{ pattern: "^[0-9]{5}$", maxLength: 5 }}
                    error={
                      newPosibleCliente.POC_codigo_postal &&
                      !/^[0-9]{5}$/.test(newPosibleCliente.POC_codigo_postal)
                    }
                    helperText={
                      newPosibleCliente.POC_codigo_postal &&
                      !/^[0-9]{5}$/.test(newPosibleCliente.POC_codigo_postal)
                        ? "El código postal debe tener exactamente 5 dígitos"
                        : ""
                    }
                  />
                </div>

                <div className="col-md-6">
                  <TextField
                    label="País"
                    name="POC_pais"
                    value={newPosibleCliente.POC_pais}
                    onChange={handleChangeInput}
                    select
                    fullWidth
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
                    label="Prospecto"
                    name="POC_estado_de_posible_cliente"
                    value={newPosibleCliente.POC_estado_de_posible_cliente}
                    onChange={handleChangeInput}
                    select
                    fullWidth
                    disabled
                  >
                    <MenuItem value="Prospecto">Prospecto</MenuItem>
                  </TextField>
                </div>

                <div className="col-md-6">
                  <TextField
                    label="Canal de Venta"
                    name="CVE_id"
                    value={newPosibleCliente.CVE_id}
                    onChange={handleChangeInput}
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
                    label="Fuente de Posible Cliente"
                    name="POC_fuente_de_posible_cliente"
                    value={newPosibleCliente.POC_fuente_de_posible_cliente}
                    onChange={handleChangeInput}
                    select
                    fullWidth
                  >
                    <MenuItem value="Llamada">Llamada</MenuItem>
                    <MenuItem value="Correo Electrónico">
                      Correo Electrónico
                    </MenuItem>
                    <MenuItem value="Referido">Referido</MenuItem>
                  </TextField>
                </div>

                <div className="col-md-6">
                <TextField
                label="Vendedor"
                name="USU_id"
                value={newPosibleCliente.USU_id}
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
                    label="Correo Electrónico Secundario"
                    name="POC_correo_electronico_secundario"
                    value={newPosibleCliente.POC_correo_electronico_secundario}
                    onChange={handleChangeInput}
                    fullWidth
                    error={
                      newPosibleCliente.POC_correo_electronico_secundario &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        newPosibleCliente.POC_correo_electronico_secundario
                      )
                    }
                    helperText={
                      newPosibleCliente.POC_correo_electronico_secundario &&
                      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                        newPosibleCliente.POC_correo_electronico_secundario
                      )
                        ? "Por favor ingrese un correo electrónico válido"
                        : ""
                    }
                  />
                </div>
                <div className="col-md-6">
                  <TextField
                    label="Teléfono Secundario"
                    name="POC_telefono_secundario"
                    value={newPosibleCliente.POC_telefono_secundario}
                    onChange={handleChangeInput}
                    fullWidth
                    inputProps={{
                      pattern: "[0-9]{8}", // 8 dígitos
                      title: "Número de teléfono de 8 dígitos",
                    }}
                    error={
                      newPosibleCliente.POC_telefono_secundario &&
                      !/^[0-9]{8}$/.test(
                        newPosibleCliente.POC_telefono_secundario
                      )
                    }
                    helperText={
                      newPosibleCliente.POC_telefono_secundario &&
                      !/^[0-9]{8}$/.test(
                        newPosibleCliente.POC_telefono_secundario
                      )
                        ? "Número de teléfono de 8 dígitos"
                        : ""
                    }
                  />
                </div>
                <div className="col-md-12">
                  <TextField
                    label="Imagen URL"
                    name="POC_imagenurl"
                    value={newPosibleCliente.POC_imagenurl}
                    onChange={handleChangeInput}
                    fullWidth
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
