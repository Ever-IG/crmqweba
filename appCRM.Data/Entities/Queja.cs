using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace appCRM.Data.Entities
{
    public class Queja
    {
         public int QUE_id { get; set; } // ID de la queja, clave primaria
        public int QUE_persona_id { get; set; } // ID de la persona (Cliente o Posible Cliente)
        public string QUE_tipo_persona { get; set; } // Tipo de persona ('Cliente' o 'Posible Cliente')
        public int USU_id { get; set; } // ID del usuario que gestionó la queja
        public DateTime QUE_fecha_queja { get; set; } // Fecha de la queja
        public string QUE_motivo { get; set; } // Motivo de la queja
        public string QUE_estado { get; set; } // Estado de la queja ('Abierto' o 'Cerrado')
        public string QUE_comentario { get; set; } 
    }
}