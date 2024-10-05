import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function NuevoPosibleCliente() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [newPosibleCliente, setNewPosibleCliente] = useState({
    POC_nombre: '',
    POC_apellido: '',
    POC_empresa: '',
    POC_nit: '',
    POC_dpi: '',
    POC_correo_electronico: '',
    POC_telefono: '',
    POC_fuente_de_posible_cliente: '',
    POC_estado_de_posible_cliente: '',
    POC_correo_electronico_secundario: '',
    POC_telefono_secundario: '',
    POC_direccion: '',
    POC_departamento: '',
    POC_municipio: '',
    POC_codigo_postal: '',
    POC_pais: '',
    POC_imagenurl: '',
    CVE_id: ''
  });

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeInput = (e) => {
    setNewPosibleCliente({
      ...newPosibleCliente,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPosibleCliente.POC_nombre || !newPosibleCliente.POC_correo_electronico) {
      toast.error('Nombre y correo electrónico son obligatorios');
      return;
    }

    const clienteConValoresPorDefecto = {
      ...newPosibleCliente,
      CVE_id: newPosibleCliente.CVE_id || 1,
    };

    console.log('Datos a enviar:', clienteConValoresPorDefecto);

    fetch('https://localhost:7228/api/PosibleCliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(clienteConValoresPorDefecto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al agregar el posible cliente');
        }
        return response.json();
      })
      .then(data => {
        setNewPosibleCliente({
          POC_nombre: '', POC_apellido: '', POC_empresa: '', POC_nit: '', POC_dpi: '', POC_correo_electronico: '',
          POC_telefono: '', POC_fuente_de_posible_cliente: '', POC_estado_de_posible_cliente: '',
          POC_correo_electronico_secundario: '', POC_telefono_secundario: '', POC_direccion: '',
          POC_departamento: '', POC_municipio: '', POC_codigo_postal: '', POC_pais: '', POC_imagenurl: '', CVE_id: ''
        });
        Swal.fire('¡Éxito!', 'Cliente agregado correctamente', 'success');
      })
      .catch(error => {
        console.error('Error:', error);
        toast.error('Error al agregar el posible cliente');
      });
  };

  const handleCancel = () => {
    navigate('/posiblecliente');
  };

  return (
    <div className="NuevoPosibleCliente">
      <div className="form-container">
        <ToastContainer />
        <h2 className="mb-4">Agregar Posible Cliente</h2>
        <form onSubmit={handleSubmit}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChangeTab} aria-label="Tabs">
                <Tab label="Información Principal" {...a11yProps(0)} />
                <Tab label="Dirección" {...a11yProps(1)} />
                <Tab label="Información Adicional" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
              <div className="row g-3">
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_nombre">Nombre<span style={{ color: 'red' }}>*</span></label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_nombre"
                      name="POC_nombre"
                      value={newPosibleCliente.POC_nombre}
                      onChange={handleChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_apellido">Apellido</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_apellido"
                      name="POC_apellido"
                      value={newPosibleCliente.POC_apellido}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-10">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_empresa">Empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_empresa"
                      name="POC_empresa"
                      value={newPosibleCliente.POC_empresa}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_nit">NIT</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_nit"
                      name="POC_nit"
                      value={newPosibleCliente.POC_nit}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_dpi">DPI</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_dpi"
                      name="POC_dpi"
                      value={newPosibleCliente.POC_dpi}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_correo_electronico">Correo Electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="POC_correo_electronico"
                      name="POC_correo_electronico"
                      value={newPosibleCliente.POC_correo_electronico}
                      onChange={handleChangeInput}
                      required
                    />
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_telefono">Teléfono</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_telefono"
                      name="POC_telefono"
                      value={newPosibleCliente.POC_telefono}
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
                    <label htmlFor="POC_direccion">Dirección</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_direccion"
                      name="POC_direccion"
                      value={newPosibleCliente.POC_direccion}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_departamento">Departamento</label>
                    <select
                      className="form-control"
                      id="POC_departamento"
                      name="POC_departamento"
                      value={newPosibleCliente.POC_departamento}
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
                    <label htmlFor="POC_municipio">Municipio</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_municipio"
                      name="POC_municipio"
                      value={newPosibleCliente.POC_municipio}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_codigo_postal">Código Postal</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_codigo_postal"
                      name="POC_codigo_postal"
                      value={newPosibleCliente.POC_codigo_postal}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_pais">País</label>
                    <select
                      className="form-control"
                      id="POC_pais"
                      name="POC_pais"
                      value={newPosibleCliente.POC_pais}
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
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_estado_de_posible_cliente">Estado</label>
                    <select
                      className="form-control"
                      id="POC_estado_de_posible_cliente"
                      name="POC_estado_de_posible_cliente"
                      value={newPosibleCliente.POC_estado_de_posible_cliente}
                      onChange={handleChangeInput}
                      disabled
                    >
                      <option value="Prospecto">Prospecto</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_fuente_de_posible_cliente">Fuente de Posible Cliente</label>
                    <select
                      className="form-control"
                      id="POC_fuente_de_posible_cliente"
                      name="POC_fuente_de_posible_cliente"
                      value={newPosibleCliente.POC_fuente_de_posible_cliente}
                      onChange={handleChangeInput}

                    >
                      <option value="1">Facebook</option>
                      <option value="3">Instagram</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_correo_electronico_secundario">Correo Electrónico Secundario</label>
                    <input
                      type="email"
                      className="form-control"
                      id="POC_correo_electronico_secundario"
                      name="POC_correo_electronico_secundario"
                      value={newPosibleCliente.POC_correo_electronico_secundario}
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group mb-3">
                    <label htmlFor="POC_telefono_secundario">Teléfono Secundario</label>
                    <input
                      type="text"
                      className="form-control"
                      id="POC_telefono_secundario"
                      name="POC_telefono_secundario"
                      value={newPosibleCliente.POC_telefono_secundario}
                      onChange={handleChangeInput}
                      pattern="[0-9]{8}"
                      title="Número de teléfono de 8 dígitos"
                    />
                  </div>
                </div>
              </div>
            </CustomTabPanel>
          </Box>

          <div className="fixed-bottom-button">
            <button type="button" className="btn btn-secondary me-2" onClick={handleCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary"
              style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}>
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
