import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';
import DepartamentoMunicipioSelect from "./Datos/DepartamentoMunicipioSelect";

const NuevoProveedor = ({
  proveedor,
  handleCloseModal,
  isEditMode,
  refreshProveedores,
}) => {
  const [formData, setFormData] = useState({
    prO_nombre: '',
    prO_apellido: '',
    prO_nombre_empresa: '',
    prO_nit: '',
    prO_telefono: '',
    prO_correo_electronico: '',
    prO_direccion: '',
    prO_departamento: '',
    prO_municipio: '',
    prO_codigo_postal: '',
    prO_pais: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDepartamentoMunicipioSelect = ({ departamento, municipio }) => {
    setFormData((prevData) => ({
      ...prevData,
      prO_departamento: departamento,
      prO_municipio: municipio,
    }));
  };

  useEffect(() => {
    if (isEditMode && proveedor) {
      setFormData(proveedor);
    }
  }, [isEditMode, proveedor]);

  const onFinish = async (event) => {
    event.preventDefault();

    const url = isEditMode
      ? `https://localhost:7228/api/Proveedor/${proveedor.prO_id}`
      : 'https://localhost:7228/api/Proveedor';

    const method = isEditMode ? 'PUT' : 'POST';

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al enviar los datos del proveedor');
        }
        return response.json();
      })
      .then(() => {
        Swal.fire({
          title: '¡Éxito!',
          text: isEditMode
            ? 'Proveedor actualizado correctamente.'
            : 'Proveedor agregado correctamente.',
          icon: 'success',
          willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
          },
        }).then(() => {
          handleCloseModal();
          refreshProveedores();
        });
      })
      .catch((error) => {
        console.error('Error al enviar los datos del proveedor:', error);
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Verifica los datos e intenta de nuevo.',
          willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
          },
        });
      });
  };

  return (
    <form className="row g-3" onSubmit={onFinish}>
        <div className="col-md-6">
            <TextField
                label="Nombre"
                name="prO_nombre"
                type="text"
                value={formData.prO_nombre}
                onChange={handleChange}
                fullWidth
                required
            />
        </div>
        <div className="col-md-6">
            <TextField
                label="Apellido"
                name="prO_apellido"
                type="text"
                value={formData.prO_apellido}
                onChange={handleChange}
                fullWidth
                required
            />
        </div>

        <div className="col-md-12">
            <TextField
                label="Nombre de la Empresa"
                name="prO_nombre_empresa"
                type="text"
                value={formData.prO_nombre_empresa}
                onChange={handleChange}
                fullWidth
                required
            />
        </div>
        <div className="col-md-6">
            <TextField
                label="NIT"
                name="prO_nit"
                type="text"
                value={formData.prO_nit}
                onChange={handleChange}
                fullWidth
                required
            />
        </div>

        <div className="col-md-6">
            <TextField
                label="Teléfono"
                name="prO_telefono"
                type="text"
                value={formData.prO_telefono}
                onChange={handleChange}
                fullWidth
                inputProps={{pattern: "^[0-9]{8}$", maxLength: 8}}
                onError={
                    formData.prO_telefono &&
                    !/^[0-9]{8}$/.test(formData.prO_telefono)
                }
                helperText={
                    formData.prO_telefono &&
                    !/^[0-9]{8}$/.test(formData.prO_telefono)
                    ? "El teléfono debe contener 8 dígitos"
                    : ""
                }
                />
        </div>
        <div className="col-md-6">
            <TextField

                label="Correo Electrónico"
                name="prO_correo_electronico"
                type="email"
                value={formData.prO_correo_electronico}
                onChange={handleChange}
                fullWidth
                error={
                    formData.prO_correo_electronico &&
                    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                      formData.prO_correo_electronico
                    )
                  }
                  helperText={
                    formData.prO_correo_electronico &&
                    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
                      formData.prO_correo_electronico
                    )
                      ? "Por favor ingrese un correo electrónico válido"
                      : ""
                  }
            />
        </div>

        <div className="col-md-6">
            <TextField
                label="Dirección"
                name="prO_direccion"
                type="text"
                value={formData.prO_direccion}
                onChange={handleChange}
                fullWidth
                />
        </div>
        <div>
            <DepartamentoMunicipioSelect
            formData={formData}
            setFormData={setFormData}
            />
            </div> 


        <div className="col-md-6">
            <TextField
                label="Código Postal"
                name="prO_codigo_postal"
                type="number"
                value={formData.prO_codigo_postal}
                onChange={handleChange}
                fullWidth
                inputProps={{ pattern: "^[0-9]{5}$", maxLength: 5 }}
                    error={
                      formData.prO_codigo_postal &&
                      !/^[0-9]{5}$/.test(formData.prO_codigo_postal)
                    }
                    helperText={
                      formData.prO_codigo_postal &&
                      !/^[0-9]{5}$/.test(formData.prO_codigo_postal)
                        ? "El código postal debe tener exactamente 5 dígitos"
                        : ""
                    }
            />
        </div>
        <div className="col-md-6">
            <TextField
                label="País"
                name="prO_pais"
                select
                value={formData.prO_pais}
                onChange={handleChange}
                fullWidth
                >
                    <MenuItem value="Guatemala">Guatemala</MenuItem>
                </TextField>
        </div>

      <div className="col-12 d-flex justify-content-end">
        <Button type="submit" variant="contained" color="primary" className="me-2">
          {isEditMode ? 'Actualizar' : 'Guardar'}
        </Button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={handleCloseModal}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default NuevoProveedor;
