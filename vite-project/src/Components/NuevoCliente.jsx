import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

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
    CVE_id: "",
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

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCliente((prevState) => ({
      ...prevState,
      [name]: value,
    }));
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
          CVE_id: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error al agregar el cliente");
      });
  };

  const handleCancel = () => {
    navigate("/verCliente");
  };

  console.log("Canales Venta:", canalesVenta);

  return (
    <div className="NuevoCliente">
      <ToastContainer />
      <h2 className="mb-4">Agregar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChangeTab} aria-label="Tabs">
            <Tab label="Información Principal" {...a11yProps(0)} />
            <Tab label="Dirección" {...a11yProps(1)} />
            <Tab label="Información Adicional" {...a11yProps(2)} />
          </Tabs>

          <CustomTabPanel value={value} index={0}>
            <div className="row g-3">
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_nombre">
                    Nombre<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_nombre"
                    name="CLI_nombre"
                    value={cliente.CLI_nombre}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_apellido">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_apellido"
                    name="CLI_apellido"
                    value={cliente.CLI_apellido}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-10">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_empresa">Empresa</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_empresa"
                    name="CLI_empresa"
                    value={cliente.CLI_empresa}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_nit">NIT</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_nit"
                    name="CLI_nit"
                    value={cliente.CLI_nit}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_dpi">DPI</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_dpi"
                    name="CLI_dpi"
                    value={cliente.CLI_dpi}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_correo_electronico">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="CLI_correo_electronico"
                    name="CLI_correo_electronico"
                    value={cliente.CLI_correo_electronico}
                    onChange={handleChangeInput}
                    required
                  />
                </div>
              </div>
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_telefono">Teléfono</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_telefono"
                    name="CLI_telefono"
                    value={cliente.CLI_telefono}
                    onChange={handleChangeInput}
                    pattern="[0-9]{8}"
                    title="Número de teléfono de 8 dígitos"
                  />
                </div>
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="row g-3">
              <div className="col-md-12">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_direccion">Dirección</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_direccion"
                    name="CLI_direccion"
                    value={cliente.CLI_direccion}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_departamento">Departamento</label>
                  <select
                    className="form-control"
                    id="CLI_departamento"
                    name="CLI_departamento"
                    value={cliente.CLI_departamento}
                    onChange={handleChangeInput}
                  >
                    <option value="Guatemala">Guatemala</option>
                    <option value="Alta Verapaz">Alta Verapaz</option>
                    <option value="Baja Verapaz">Baja Verapaz</option>
                    <option value="Chimaltenango">Chimaltenango</option>
                    <option value="Chiquimula">Chiquimula</option>
                    <option value="El Progreso">El Progreso</option>
                    <option value="Escuintla">Escuintla</option>
                    <option value="Huehuetenango">Huehuetenango</option>
                    <option value="Izabal">Izabal</option>
                    <option value="Jalapa">Jalapa</option>
                    <option value="Jutiapa">Jutiapa</option>
                    <option value="Petén">Petén</option>
                    <option value="Quetzaltenango">Quetzaltenango</option>
                    <option value="Quiché">Quiché</option>
                    <option value="Retalhuleu">Retalhuleu</option>
                    <option value="Sacatepéquez">Sacatepéquez</option>
                    <option value="San Marcos">San Marcos</option>
                    <option value="Santa Rosa">Santa Rosa</option>
                    <option value="Sololá">Sololá</option>
                    <option value="Suchitepéquez">Suchitepéquez</option>
                    <option value="Totonicapán">Totonicapán</option>
                    <option value="Zacapa">Zacapa</option>
                  </select>
                </div>
              </div>

              <div className="col-md-8">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_municipio">Municipio</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_municipio"
                    name="CLI_municipio"
                    value={cliente.CLI_municipio}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_codigo_postal">Código Postal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_codigo_postal"
                    name="CLI_codigo_postal"
                    value={cliente.CLI_codigo_postal}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_pais">País</label>
                  <select
                    className="form-control"
                    id="CLI_pais"
                    name="CLI_pais"
                    value={cliente.CLI_pais}
                    onChange={handleChangeInput}
                  >
                    <option value="Guatemala">Guatemala</option>
                  </select>
                </div>
              </div>
            </div>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_correo_electronico_secundario">
                    Correo Electrónico Secundario
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="CLI_correo_electronico_secundario"
                    name="CLI_correo_electronico_secundario"
                    value={cliente.CLI_correo_electronico_secundario}
                    onChange={handleChangeInput}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="CLI_telefono_secundario">
                    Teléfono Secundario
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="CLI_telefono_secundario"
                    name="CLI_telefono_secundario"
                    value={cliente.CLI_telefono_secundario}
                    onChange={handleChangeInput}
                    pattern="[0-9]{8}"
                    title="Número de teléfono de 8 dígitos"
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="form-group mb-3">
                  <label htmlFor="CVE_id">Canal de Venta</label>
                  <select
                    className="form-control"
                    id="CVE_id"
                    name="CVE_id"
                    placeholder="Seleccione un Canal de Venta"
                    value={cliente.CVE_id}
                    onChange={handleChangeInput}
                  >
                    <option value=""></option>
                    {canalesVenta.map((canal) => (
                      <option key={canal.cvE_id} value={canal.cvE_id}>
                        {canal.cvE_nombre}
                      </option>
                    ))}
                  </select>
                </div>
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
            style={{ backgroundColor: "#8E0D3C", color: "#ffffff" }}
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}
