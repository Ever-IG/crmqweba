// PerdidoPoc.jsx
import React from 'react';
import { Tooltip, IconButton } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'; 
import Swal from 'sweetalert2';
import dayjs from 'dayjs';

function PerdidoPoc({ posibleCliente, onClientePerdido, onConfirmarPerdidoExternamente }) {
  const today = dayjs().format('YYYY-MM-DD');

  const marcarComoPerdido = async (posibleCliente) => {
    const clienteActualizado = {
      poC_id: posibleCliente.poC_id,
      poC_nombre: posibleCliente.poC_nombre,
      poC_apellido: posibleCliente.poC_apellido,
      poC_empresa: posibleCliente.poC_empresa,
      poC_nit: posibleCliente.poC_nit,
      poC_dpi: posibleCliente.poC_dpi,
      poC_correo_electronico: posibleCliente.poC_correo_electronico,
      poC_telefono: posibleCliente.poC_telefono,
      poC_correo_electronico_secundario: posibleCliente.poC_correo_electronico_secundario,
      poC_telefono_secundario: posibleCliente.poC_telefono_secundario,
      poC_direccion: posibleCliente.poC_direccion,
      poC_departamento: posibleCliente.poC_departamento,
      poC_municipio: posibleCliente.poC_municipio,
      poC_codigo_postal: posibleCliente.poC_codigo_postal,
      poC_pais: posibleCliente.poC_pais,
      poC_fuente_de_posible_cliente: posibleCliente.poC_fuente_de_posible_cliente,
      poC_imagenurl: posibleCliente.poC_imagenurl,
      cvE_id: posibleCliente.cvE_id,
      usU_id: posibleCliente.usU_id,
      poC_estado_de_posible_cliente: 'Perdido', // Cambiar estado a 'Perdido'
      poC_fecha: today, // Fecha de actualización
    };

    const response = await fetch(`https://localhost:7228/api/PosibleCliente/${posibleCliente.poC_id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteActualizado),
    });

    if (response.status === 204) return;
    else throw new Error('Error al marcar como perdido.');
  };

  const confirmarPerdido = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'El posible cliente será marcado como perdido.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, marcar como perdido',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await marcarComoPerdido(posibleCliente);
        Swal.fire('Éxito', 'El posible cliente ha sido marcado como perdido.', 'success');
        onClientePerdido(posibleCliente.poC_id); // Notificar al componente padre
      } catch (error) {
        Swal.fire('Error', 'Hubo un problema al marcar como perdido.', 'error');
      }
    }
  };

  // Exponer la función para uso externo si se proporciona la prop
  if (onConfirmarPerdidoExternamente) {
    onConfirmarPerdidoExternamente(confirmarPerdido);
  }

  return (
    <Tooltip title="Marcar como Perdido">
      <IconButton onClick={confirmarPerdido}>
        <HighlightOffIcon sx={{ color: '#d9534f' }} />
      </IconButton>
    </Tooltip>
  );
}

export default PerdidoPoc;
