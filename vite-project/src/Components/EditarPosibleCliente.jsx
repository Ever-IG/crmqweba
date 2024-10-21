import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { TextField, MenuItem } from "@mui/material";
import DepartamentoMunicipioSelect from "./Datos/DepartamentoMunicipioSelect";

function EditarPosibleCliente({ posiblecliente, handleUpdate, handleClose }) {
  const [formData, setFormData] = useState({
    poC_nombre: "",
    poC_apellido: "",
    poC_empresa: "",
    poC_nit: "",
    poC_dpi: "",
    poC_correo_electronico: "",
    poC_telefono: "",
    poC_fuente_de_posible_cliente: "",
    poC_estado_de_posible_cliente: "",
    poC_correo_electronico_secundario: "",
    poC_telefono_secundario: "",
    poC_direccion: "",
    poC_departamento: "",
    poC_municipio: "",
    poC_codigo_postal: "",
    poC_pais: "",
    poC_imagenurl: "",
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
        console.error("Error al cargar los canales de venta:", error)
      );
  }, []);

  useEffect(() => {
    fetch("https://localhost:7228/api/Usuario")
      .then((response) => response.json())
      .then((data) => setVendedores(data))
      .catch((error) => console.error("Error al cargar vendedores:", error));
  }, []);

  useEffect(() => {
    if (posiblecliente) {
      setFormData((prevData) => ({
        ...prevData,
        ...posiblecliente,
        cvE_id: posiblecliente.cvE_id || "",
        usU_id: posiblecliente.usU_id || "", // Asegurarse que esté preseleccionado si existe
        poC_estado_de_posible_cliente: posiblecliente.poC_estado_de_posible_cliente || "",
      }));
    }
  }, [posiblecliente]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://localhost:7228/api/PosibleCliente/${posiblecliente.poC_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 204) {
        // Si la respuesta es 204, no hay cuerpo, simplemente actualizamos con formData
        handleUpdate(posiblecliente.poC_id, formData);
        Swal.fire(
          "¡Éxito!",
          "Posible cliente actualizado correctamente",
          "success"
        );
        handleClose();
      } else if (response.status === 201) {
        const newCliente = await response.json();
        handleUpdate(posiblecliente.poC_id, newCliente); // Actualizar con la nueva información del cliente creado
        Swal.fire(
          "¡Éxito!",
          "Posible cliente convertido a cliente correctamente",
          "success"
        );
        handleClose();
      } else if (response.ok) {
        const updatedCliente = await response.json();
        handleUpdate(posiblecliente.poC_id, updatedCliente);
        Swal.fire(
          "¡Éxito!",
          "Posible cliente actualizado correctamente",
          "success"
        );
        handleClose();
      } else {
        throw new Error("Error inesperado en la actualización");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        "Hubo un problema al actualizar el posible cliente",
        "error"
      );
    }
  };

  return (
    <form className="row g-4" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <TextField
          label="Nombre"
          name="poC_nombre"
          value={formData.poC_nombre}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Apellido"
          name="poC_apellido"
          value={formData.poC_apellido}
          onChange={handleChange}
          required
          fullWidth
        />
      </div>

      <div className="col-md-12">
        <TextField
          label="Empresa"
          name="poC_empresa"
          value={formData.poC_empresa}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="NIT"
          name="poC_nit"
          value={formData.poC_nit}
          onChange={handleChange}
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="DPI"
          name="poC_dpi"
          value={formData.poC_dpi}
          onChange={handleChange}
          inputProps={{ pattern: "^[1-9][0-9]{12}$", maxLength: 13 }}
          error={formData.poC_dpi && !/^[1-9][0-9]{12}$/.test(formData.poC_dpi)}
          helperText={
            formData.poC_dpi && !/^[1-9][0-9]{12}$/.test(formData.poC_dpi)
              ? "El DPI debe contener 13 dígitos y no comenzar con 0"
              : ""
          }
          fullWidth
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Correo Electrónico"
          name="poC_correo_electronico"
          value={formData.poC_correo_electronico}
          onChange={handleChange}
          fullWidth
          error={
            formData.poC_correo_electronico &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              formData.poC_correo_electronico
            )
          }
          helperText={
            formData.poC_correo_electronico &&
            !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
              formData.poC_correo_electronico
            )
              ? "Por favor ingrese un correo electrónico válido"
              : ""
          }
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Teléfono"
          name="poC_telefono"
          value={formData.poC_telefono}
          onChange={handleChange}
          fullWidth
          inputProps={{
            pattern: "[0-9]{8}", // 8 dígitos
            title: "Número de teléfono de 8 dígitos",
          }}
          error={
            formData.poC_telefono && !/^[0-9]{8}$/.test(formData.poC_telefono)
          }
          helperText={
            formData.poC_telefono && !/^[0-9]{8}$/.test(formData.poC_telefono)
              ? "Número de teléfono de 8 dígitos"
              : ""
          }
        />
      </div>

      <div className="col-md-6">
        <TextField
          label="Fuente de Posible Cliente"
          name="poC_fuente_de_posible_cliente"
          value={formData.poC_fuente_de_posible_cliente}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value="Llamada">Llamada</MenuItem>
          <MenuItem value="Correo Electrónico">Correo Electrónico</MenuItem>
          <MenuItem value="Página Web">Página Web</MenuItem>
          <MenuItem value="Referido">Referido</MenuItem>
          </TextField>
      </div>

      <div className="col-md-6">
        <TextField
          label="Vendedor Asignado"
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
      
        

      <div className="col-md-6">
        <TextField
          label="Canal de Venta"
          name="cvE_id"
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
        label="Estado de posible cliente"
        name="poC_estado_de_posible_cliente"
        value={formData.poC_estado_de_posible_cliente}
        select
        onChange={handleChange}
        fullWidth
        >
        <MenuItem value="Prospecto">Prospecto</MenuItem>
        <MenuItem value="Perdido">Perdido</MenuItem>
        </TextField>            
      </div>
      <div className="col-md-12">
        <TextField
        label="Dirección"
        name="poC_direccion"
        value={formData.poC_direccion}
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
          name="poC_codigo_postal"
          value={formData.poC_codigo_postal}
          onChange={handleChange}
          fullWidth
          inputProps={{
            pattern: "[0-9]{5}", // 5 dígitos
            title: "Código postal de 5 dígitos",
          }}
          error={
            formData.poC_codigo_postal && !/^[0-9]{5}$/.test(formData.poC_codigo_postal)
          }
          helperText={
            formData.poC_codigo_postal && !/^[0-9]{5}$/.test(formData.poC_codigo_postal)
              ? "Código postal de 5 dígitos"
              : ""
          }
        />
        </div>
      <div className="col-md-6">
        <TextField
          label="País"
          name="poC_pais"
          value={formData.poC_pais}
          onChange={handleChange}
          fullWidth
          select
          >
            <MenuItem value="Guatemala">Guatemala</MenuItem>
          </TextField>
      </div>

      <div className="col-md-6">
        <TextField
        label="Correo Electrónico Secundario"
        name="poC_correo_electronico_secundario"
        value={formData.poC_correo_electronico_secundario}
        onChange={handleChange}
        type="email"
        fullWidth
        error={
          formData.poC_correo_electronico_secundario &&
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
            formData.poC_correo_electronico_secundario
          )
        }
        helperText={
          formData.poC_correo_electronico_secundario &&
          !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
            formData.poC_correo_electronico_secundario
          )
            ? "Por favor ingrese un correo electrónico válido"
            : ""
        }
        />
      </div>

      <div className="col-md-6">
        <TextField
        label="Teléfono Secundario"
        name="poC_telefono_secundario"
        value={formData.poC_telefono_secundario}
        onChange={handleChange}
        fullWidth
        inputProps={{
          pattern: "[0-9]{8}", // 8 dígitos
          title: "Número de teléfono de 8 dígitos",
        }}
        error={
          formData.poC_telefono_secundario &&
          !/^[0-9]{8}$/.test(formData.poC_telefono_secundario)
        }
        helperText={
          formData.poC_telefono_secundario &&
          !/^[0-9]{8}$/.test(formData.poC_telefono_secundario)
            ? "Número de teléfono de 8 dígitos"
            : ""
        }
        />
      </div>

      <div className="col-12 d-flex justify-content-end mt-4">
        <button type="submit" className="btn btn-primary">
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-danger ms-2"
          onClick={handleClose}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default EditarPosibleCliente;
