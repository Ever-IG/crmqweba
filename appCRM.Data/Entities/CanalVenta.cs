using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class CanalVenta
    {

        public int CVE_id { get; set; } // ID de la entidad, clave primaria
        public string CVE_nombre { get; set; } // Nombre del canal de venta
        public string CVE_descripcion { get; set; } // Descripción del canal de venta
        public string CVE_estado { get; set; }


    }
}