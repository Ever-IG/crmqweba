namespace appCRM.Data.Entities
{
    public class Seguimiento
    {
        public int SEG_id { get; set; } // Clave primaria
        public int USU_id { get; set; } // ID del usuario
        public int CLI_id { get; set; } // ID del cliente
        public int POC_id { get; set; } // ID del posible cliente
        public string SEG_tipo_seguimiento { get; set; } // Tipo de seguimiento
        public DateTime SEG_fecha_seguimiento { get; set; } // Fecha del seguimiento
        public string SEG_asunto { get; set; } // Asunto del seguimiento
        public string SEG_proposito_llamada { get; set; } // Propósito de la llamada
        public string SEG_resultado { get; set; } // Resultado del seguimiento
        public string SEG_comentario { get; set; } // Comentario adicional
    }
}
