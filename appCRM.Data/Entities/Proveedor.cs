using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class Proveedor
    {
         public int PRO_id { get; set; } // ID de la entidad, clave primaria
        public string PRO_nombre { get; set; } // Nombre del proveedor
        public string PRO_apellido { get; set; } // Apellido del proveedor
        public string PRO_nombre_empresa { get; set; } // Empresa del proveedor
        public string PRO_nit { get; set; } // NIT del proveedor
        public string PRO_telefono { get; set; } // Teléfono del proveedor
        public string PRO_correo_electronico { get; set; } // Correo electrónico del proveedor
        public string PRO_direccion { get; set; } // Dirección del proveedor
        public string PRO_departamento { get; set; } // Departamento del proveedor
        public string PRO_municipio { get; set; } // Municipio del proveedor
        public string PRO_codigo_postal { get; set; } // Código postal del proveedor
        public string PRO_pais { get; set; } // País del proveedor
    }
}