import React, { useState, useEffect } from 'react';
import EditarPosibleCliente from './EditarPosibleCliente'; // Ajusta la ruta si es necesario
import Swal from 'sweetalert2';
import Button from '@material-ui/core/Button';


function MenuOpciones() {

    return (
        <div className="contenedor-columnas">
  <h3 className="titulo">Todos los posibles clientes</h3>
  <Button className="nuevo-btn" variant="contained" color="primary">
    Nuevo
  </Button>
  

</div>

      
    );

}

export default MenuOpciones;