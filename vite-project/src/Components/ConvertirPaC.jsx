import React from 'react';
import { Button } from 'antd';
import Swal from 'sweetalert2';

function ConvertirPaC({ posibleCliente, onClienteConvertido }) {

  // Función para validar los datos del posible cliente
  const validarPosibleCliente = (cliente) => {
    if (!cliente.poC_nombre || !cliente.poC_apellido || !cliente.poC_correo_electronico) {
      Swal.fire('Error', 'Faltan datos esenciales del cliente (nombre, apellido o correo electrónico)', 'error');
      return false;
    }

    return true;
  };

  // Nueva función para agregar cliente
  const agregarCliente = async (posibleCliente) => {
    const nuevoCliente = {
      cli_nombre: posibleCliente.poC_nombre,
      cli_apellido: posibleCliente.poC_apellido,
      cli_empresa: posibleCliente.poC_empresa,
      cli_nit: posibleCliente.poC_nit,
      cli_dpi: posibleCliente.poC_dpi,
      cli_correo_electronico: posibleCliente.poC_correo_electronico,
      cli_telefono: posibleCliente.poC_telefono,
      cli_correo_electronico_secundario: posibleCliente.poC_correo_electronico_secundario,
      cli_telefono_secundario: posibleCliente.poC_telefono_secundario,
      cli_direccion: posibleCliente.poC_direccion,
      cli_departamento: posibleCliente.poC_departamento,
      cli_municipio: posibleCliente.poC_municipio,
      cli_codigo_postal: posibleCliente.poC_codigo_postal,
      cli_pais: posibleCliente.poC_pais,
      cli_imagenurl: posibleCliente.poC_imagenurl,
      cve_id: posibleCliente.cve_id || 1
    };

    const response = await fetch('https://localhost:7228/api/Cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoCliente),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Datos inválidos, por favor revisa la información.');
      } else if (response.status === 500) {
        throw new Error('Error interno del servidor.');
      } else {
        throw new Error('Error desconocido al agregar el cliente.');
      }
    }

    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.includes('application/json') ? await response.json() : {};
  };

  const actualizarEstadoPosibleCliente = async (posibleCliente) => {
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
      poC_pais: posibleCliente.poC_pais,
      poC_fuente_de_posible_cliente: posibleCliente.poC_fuente_de_posible_cliente,
      poC_imagenurl: posibleCliente.poC_imagenurl,
      poC_municipio: posibleCliente.poC_municipio,
      poC_codigo_postal: posibleCliente.poC_codigo_postal,  
      cvE_id: posibleCliente.cve_id || 1,    
      poC_estado_de_posible_cliente: 'Cliente', // Cambiar el estado a 'Cliente'
    };

    const response = await fetch(`https://localhost:7228/api/PosibleCliente/${posibleCliente.poC_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clienteActualizado),
    });

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Error en los datos enviados.');
      } else if (response.status === 404) {
        throw new Error('Posible cliente no encontrado.');
      } else if (response.status === 500) {
        throw new Error('Error interno del servidor.');
      } else {
        throw new Error('Error al actualizar el estado del posible cliente.');
      }
    }

    const contentType = response.headers.get('Content-Type');
    return contentType && contentType.includes('application/json') ? await response.json() : {};
  };

  // Función para convertir a cliente
  const convertirACliente = async () => {
    try {
      // Validar los datos del posible cliente antes de la conversión
      if (!validarPosibleCliente(posibleCliente)) {
        return; // Si la validación falla, se interrumpe la conversión
      }

      // Llamar a la función para agregar el cliente
      await agregarCliente(posibleCliente);

      // Actualizar el estado del posible cliente
      await actualizarEstadoPosibleCliente(posibleCliente);

      // Mostrar un único mensaje de éxito al finalizar todo el proceso
      Swal.fire('Éxito', 'El posible cliente ha sido convertido exitosamente', 'success');

      // Llamar al callback para actualizar la lista de posibles clientes en el componente padre
      onClienteConvertido(posibleCliente.poC_id);

    } catch (error) {
      console.error('Error al convertir a cliente:', error);
      Swal.fire('Error', error.message || 'Hubo un problema al convertir el posible cliente', 'error');
    }
  };

  return (
    <Button 
      type="primary" 
      onClick={convertirACliente} 
      style={{ backgroundColor: '#8E0D3C', color: '#ffffff' }}
    >
      Convertir a Cliente
    </Button>
  );
}

export default ConvertirPaC;