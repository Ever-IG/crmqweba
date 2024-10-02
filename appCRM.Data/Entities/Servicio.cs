using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class Servicio
    {
         public int SER_id { get; set; } // ID del servicio, clave primaria
        public string SER_nombre { get; set; } // Nombre del servicio
        public string SER_descripcion { get; set; } // Descripción del servicio
        public decimal SER_precio { get; set; } 

    }
}