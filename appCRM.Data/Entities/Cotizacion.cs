namespace appCRM.Data.Entities
{
    public class Cotizacion
    {
        public int COT_id { get; set; } // ID de la cotización, clave primaria
        public string COT_numero { get; set; } // Número de la cotización
        public DateTime COT_fecha_cotizacion { get; set; } // Fecha de la cotización
        public DateTime COT_fecha_vencimiento { get; set; } // Fecha de vencimiento de la cotización
        public int USU_id { get; set; } // Clave foránea al usuario
        public int clI_id { get; set; } // Clave foránea al cliente
        public string COT_asunto { get; set; } // Asunto de la cotización
        public decimal COT_total { get; set; } // Total de la cotización
        public string COT_estado { get; set; } // Estado de la cotización

    }
}
