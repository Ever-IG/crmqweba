import React, { useState, useEffect } from "react";
import { Button, TextField, Box, Select, MenuItem } from "@mui/material";
import Swal from "sweetalert2";
import DepartamentoMunicipioSelect from "./Datos/DepartamentoMunicipioSelect";

const EditarProveedor = ({proveedor, handleCloseModal, refreshproveedores }) => {
  const [formData, setFormData] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nit, setNit] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo_electronico, setCorreo_electronico] = useState("");
  const [direccion, setDireccion] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [codigo_postal, setCodigo_postal] = useState("");
  const [pais, setPais] = useState("");
  const [nombre_empresa, setNombre_empresa] = useState("");


  // Actualizar el formData cuando cambie el proveedor seleccionado


     useEffect(() => {
    if (proveedor) {
      setNombre(proveedor.prO_nombre);
      setApellido(proveedor.prO_apellido);
      setNit(proveedor.prO_nit);
      setTelefono(proveedor.prO_telefono);
      setCorreo_electronico(proveedor.prO_correo_electronico);
      setDireccion(proveedor.prO_direccion);
      setDepartamento(proveedor.prO_departamento);
      setMunicipio(proveedor.prO_municipio);
      setCodigo_postal(proveedor.prO_codigo_postal);
      setPais(proveedor.prO_pais);
      setNombre_empresa(proveedor.prO_nombre_empresa);
    }
  }, [proveedor]);


  const handleUpdate = (event) => {
    event.preventDefault();
    const data = {  
      prO_id: proveedor.prO_id,
      prO_nombre: nombre,
      prO_apellido: apellido,
      prO_nit: nit,
      prO_telefono: telefono,
      prO_correo_electronico: correo_electronico,
      prO_direccion: direccion,
      prO_departamento: departamento,
      prO_municipio: municipio,
      prO_codigo_postal: codigo_postal,
      prO_pais: pais,
      prO_nombre_empresa: nombre_empresa,
    };
    
    
    fetch(`https://localhost:7228/api/Proveedor/${proveedor.prO_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al actualizar el proveedor');
      }
      Swal.fire({
        title: "Éxito!",
        text: "Proveedor Actualizado Correctamente!",
        icon: "success",
        willOpen: () => {
            document.querySelector('.swal2-container').style.zIndex = '3000';
        }
    }).then(() => {
        handleCloseModal(); // Cerrar el modal después de actualizar

    });
}).catch((error) => {
    console.error('Error al actualizar el proveedor:', error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Verifica los datos e intenta de nuevo!",
      willOpen: () => {
          document.querySelector('.swal2-container').style.zIndex = '3000';
      }
  });
});
};



   
  return (
    <form className="row g-3" onSubmit={handleUpdate}>
        <div className="col-md-6">
            <TextField
                label="Nombre"
                name="prO_nombre"
                type="text"
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
                fullWidth
                required
            />
        </div>
        <div className="col-md-6">
            <TextField
                label="Apellido"
                name="prO_apellido"
                type="text"
                value={apellido}
                onChange={(event) => setApellido(event.target.value)}
                fullWidth
                required
            />
        </div>

        <div className="col-md-12">
            <TextField
                label="Nombre de la Empresa"
                name="prO_nombre_empresa"
                type="text"
                value={nombre_empresa}
                onChange={(event) => setNombre_empresa(event.target.value)}
                fullWidth
                required
            />
        </div>
        <div className="col-md-6">
            <TextField
                label="NIT"
                name="prO_nit"
                type="text"
                value={nit}
                onChange={(event) => setNit(event.target.value)}
                fullWidth
                required
            />
        </div>

        <div className="col-md-6">
            <TextField
                label="Teléfono"
                name="prO_telefono"
                type="text"
                value={telefono}
                onChange={(event) => setTelefono(event.target.value)}
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
                value={correo_electronico}
                onChange={event => setCorreo_electronico(event.target.value)}
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
                value={direccion}
                onChange={(event) => setDireccion(event.target.value)}
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
                value={codigo_postal}
                onChange={(event) => setCodigo_postal(event.target.value)}
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
                value={pais}
                onChange={(event) => setPais(event.target.value)}
                fullWidth
                >
                    <MenuItem value="Guatemala">Guatemala</MenuItem>
                </TextField>
        </div>
        <div className="col-12 d-flex justify-content-end">
              <button type='submit' className="btn btn-primary">Actualizar</button>
              <button type="button" className="btn btn-danger ms-2" onClick={handleCloseModal}>Cancelar</button>
        </div>
    </form>
  );
}

export default EditarProveedor;