import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { TextField, MenuItem } from "@mui/material";
import DepartamentoMunicipioSelect from "./Datos/DepartamentoMunicipioSelect";

function EditarCliente({ cliente, handleUpdate, handleClose }) {
  const [formData, setFormData] = useState({
    clI_nombre: "",
    clI_apellido: "",
    clI_empresa: "",
    clI_nit: "",
    clI_dpi: "",
    clI_correo_electronico: "",
    clI_telefono: "",
    clI_correo_electronico_secundario: "",
    clI_telefono_secundario: "",
    clI_direccion: "",
    clI_departamento: "",
    clI_municipio: "",
    clI_codigo_postal: "",
    clI_pais: "",
    clI_imagenurl: "",
    cvE_id: "",
    usU_id: "",

  });
  const [canalesVenta, setCanalesVenta] = useState([]);
  const [vendedores, setVendedores] = useState([]); 

  useEffect(() => {
    fetch("https://localhost:7228/api/CanalVenta")
      .then((response) => response.json())
      .then((data) => setCanalesVenta(data))
      .catch((error) =>
        console.error("Error al cargar canales de venta:", error)
      );
  }, []);

  useEffect(() => {
    fetch("https://localhost:7228/api/Usuario")
      .then((response) => response.json())
      .then((data) => setVendedores(data))
      .catch((error) => console.error("Error al cargar vendedores:", error));
  }, []);

  useEffect(() => {
    if (cliente) {
      setFormData((prevData) => ({
        ...prevData,
        ...cliente,
        cvE_id: cliente.cvE_id || "", // Asegurarse que esté preseleccionado si existe
        usU_id: cliente.usU_id || "", // Asegurarse que esté preseleccionado si existe
      }));
    }
  }, [cliente]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7228/api/Cliente/${cliente.clI_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Error al actualizar el cliente");

      const updatedCliente =
        response.status !== 204 ? await response.json() : formData;
      handleUpdate(cliente.clI_id, updatedCliente);
      Swal.fire("¡Éxito!", "Cliente actualizado correctamente", "success");
      handleClose();
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al actualizar el cliente", "error");
    }
  };

  return (
    <Form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <TextField
          label="Nombre"
          name="clI_nombre"
          value={formData.clI_nombre}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Apellido"
          name="clI_apellido"
          value={formData.clI_apellido}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>

      <div className="col-md-12">
        <TextField
          label="Empresa"
          name="clI_empresa"
          value={formData.clI_empresa}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="NIT"
          name="clI_nit"
          value={formData.clI_nit}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="DPI"
          name="clI_dpi"
          value={formData.clI_dpi}
          onChange={handleChange}
          inputProps={{ pattern: "^[1-9][0-9]{12}$", maxLength: 13 }}
          error={formData.clI_dpi && !/^[1-9][0-9]{12}$/.test(formData.clI_dpi)}
          helperText={
            formData.clI_dpi && !/^[1-9][0-9]{12}$/.test(formData.clI_dpi)
              ? "El DPI debe contener 13 dígitos y no comenzar con 0"
              : ""
          }
          fullWidth
        />
      </div>
      <div className="col-md-6">
        <TextField
          label="Correo Electrónico"
          name="clI_correo_electronico"
          value={formData.clI_correo_electronico}
          onChange={handleChange}
          type="email"
          required
          fullWidth
          error={
            formData.clI_correo_electronico &&
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
              formData.clI_correo_electronico
            )
          }
          helperText={
            formData.clI_correo_electronico &&
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
              formData.clI_correo_electronico
            )
              ? "Por favor ingrese un correo electrónico válido"
              : ""
          }
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Teléfono"
          name="clI_telefono"
          value={formData.clI_telefono}
          onChange={handleChange}
          fullWidth
          inputProps={{
            pattern: "[0-9]{8}", // 8 dígitos
            title: "Número de teléfono de 8 dígitos",
          }}
          error={
            formData.clI_telefono && !/^[0-9]{8}$/.test(formData.clI_telefono)
          }
          helperText={
            formData.clI_telefono && !/^[0-9]{8}$/.test(formData.clI_telefono)
              ? "Número de teléfono de 8 dígitos"
              : ""
          }
        />
      </div>
      <div className="col-md-12">
        <TextField
          label="Dirección"
          name="clI_direccion"
          value={formData.clI_direccion}
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
          name="clI_codigo_postal"
          value={formData.clI_codigo_postal}
          onChange={handleChange}
          fullWidth
          inputProps={{
            pattern: "^[0-9]{5}$", // Asegura que sean solo 5 dígitos numéricos
            maxLength: 5, // Máximo de 5 caracteres
            title: "El código postal debe ser un número de 5 dígitos",
          }}
          error={
            formData.clI_codigo_postal &&
            !/^[0-9]{5}$/.test(formData.clI_codigo_postal)
          }
          helperText={
            formData.clI_codigo_postal &&
            !/^[0-9]{5}$/.test(formData.clI_codigo_postal)
              ? "El código postal debe contener exactamente 5 dígitos"
              : ""
          }
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="País"
          name="clI_pais"
          value={formData.clI_pais}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Correo Electrónico Secundario"
          name="clI_correo_electronico_secundario"
          value={formData.clI_correo_electronico_secundario}
          onChange={handleChange}
          type="email"
          fullWidth
          error={
            formData.clI_correo_electronico_secundario &&
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
              formData.clI_correo_electronico_secundario
            )
          }
          helperText={
            formData.clI_correo_electronico_secundario &&
            !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
              formData.clI_correo_electronico_secundario
            )
              ? "Por favor ingrese un correo electrónico válido"
              : ""
          }
        />
      </div>
      <div className="col-md-6">
        <TextField
          label="Teléfono Secundario"
          name="clI_telefono_secundario"
          value={formData.clI_telefono_secundario}
          onChange={handleChange}
          fullWidth
          inputProps={{
            pattern: "[0-9]{8}", // 8 dígitos
            title: "Número de teléfono de 8 dígitos",
          }}
          error={
            formData.clI_telefono_secundario &&
            !/^[0-9]{8}$/.test(formData.clI_telefono_secundario)
          }
          helperText={
            formData.clI_telefono_secundario &&
            !/^[0-9]{8}$/.test(formData.clI_telefono_secundario)
              ? "Número de teléfono de 8 dígitos"
              : ""
          }
        />
      </div>
      <div className="col-md-6">
        <TextField
          label="Canal de Venta"
          name="CVE_id"
          value={formData.cvE_id || ""} // Valor preseleccionado o vacío
          onChange={handleChange}
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
          name="usU_id"
          value={formData.usU_id || ""} // Valor preseleccionado o vacío
          onChange={handleChange}
          select
          fullWidth
        >
          {vendedores.map((vendedor) => (
            <MenuItem key={vendedor.usU_id} value={vendedor.usU_id}>
              {vendedor.usU_nombre}
            </MenuItem>
          ))}
        </TextField>
      </div>

      <div className="col-md-12">
        <TextField
          label="Fotografía"
          name="clI_imagenurl"
          value={formData.clI_imagenurl}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-12 d-flex justify-content-end mt-4">
        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
        <Button variant="danger" className="ms-2" onClick={handleClose}>
          Cancelar
        </Button>
      </div>
    </Form>
  );
}

export default EditarCliente;
