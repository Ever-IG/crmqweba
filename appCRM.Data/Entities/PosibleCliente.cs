using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class PosibleCliente
    {
              public int POC_id { get; set; } // ID del posible cliente, clave primaria
        public string POC_nombre { get; set; } // Nombre del posible cliente
        public string POC_apellido { get; set; } // Apellido del posible cliente
        public string POC_empresa { get; set; } // Empresa del posible cliente
        public string POC_nit { get; set; } // NIT del posible cliente
        public string POC_dpi { get; set; } // DPI del posible cliente
        public string POC_correo_electronico { get; set; } // Correo electrónico del posible cliente
        public string POC_telefono { get; set; } // Teléfono del posible cliente
        public string POC_fuente_de_posible_cliente { get; set; } // Fuente del posible cliente
        public string POC_estado_de_posible_cliente { get; set; } // Estado del posible cliente (Prospecto, Cliente, No interesado)
        public string POC_correo_electronico_secundario { get; set; } // Correo electrónico secundario
        public string POC_telefono_secundario { get; set; } // Teléfono secundario
        public string POC_direccion { get; set; } // Dirección del posible cliente
        public string POC_departamento { get; set; } // Departamento del posible cliente
        public string POC_municipio { get; set; } // Municipio del posible cliente
        public string POC_codigo_postal { get; set; } // Código postal del posible cliente
        public string POC_pais { get; set; } // País del posible cliente
        public string POC_imagenurl { get; set; } // URL de la imagen del posible cliente
        public int CVE_id { get; set; } // ID del canal de venta asociado
    }
}