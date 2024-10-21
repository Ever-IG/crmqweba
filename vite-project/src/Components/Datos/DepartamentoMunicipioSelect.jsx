import React from 'react';
import { TextField, MenuItem, Grid } from '@mui/material';
import {departamentosYMunicipios} from './departamentosYMunicipios' // Asegúrate de la ruta correcta

function DepartamentoMunicipioSelect({ formData, setFormData }) {
  const handleDepartamentoChange = (e) => {
    const departamento = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      clI_departamento: departamento,
      clI_municipio: "" // Resetea el municipio al cambiar de departamento
    }));
  };

  const handleMunicipioChange = (e) => {
    const municipio = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      clI_municipio: municipio
    }));
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          select
          label="Departamento"
          name="clI_departamento"
          value={formData.clI_departamento}
          onChange={handleDepartamentoChange}
          fullWidth
        >
          <MenuItem value="">Seleccione un Departamento</MenuItem>
          {Object.keys(departamentosYMunicipios).map((departamento) => (
            <MenuItem key={departamento} value={departamento}>
              {departamento}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          select
          label="Municipio"
          name="clI_municipio"
          value={formData.clI_municipio}
          onChange={handleMunicipioChange}
          fullWidth
          disabled={!formData.clI_departamento} // Deshabilita si no hay departamento seleccionado
        >
          <MenuItem value="">Seleccione un Municipio</MenuItem>
          {(departamentosYMunicipios[formData.clI_departamento] || []).map((municipio) => (
            <MenuItem key={municipio} value={municipio}>
              {municipio}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
}

export default DepartamentoMunicipioSelect;
