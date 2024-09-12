using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class Usuario
    {
         public int USU_id { get; set; } // ID del servicio, clave primaria
        public string USU_nombre { get; set; } // Nombre del servicio
        public string USU_correo_electronico { get; set; } // Descripción del servicio
        public int ROL_id { get; set; } 

    }
}