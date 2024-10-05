import React from 'react';
import Button from '@material-ui/core/Button';
import imagen1 from '../assets/imagen1.jpg'; // Importa la imagen

function MenuOpciones() {

  return (
    <div className="contenedor-columnas" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* Añade la imagen */}
        <div>
            <img src={imagen1} alt="Descripción de la imagen" style={{ width: '1000px', height: '700px' }} />
        </div>
    </div>
);

}

export default MenuOpciones;
