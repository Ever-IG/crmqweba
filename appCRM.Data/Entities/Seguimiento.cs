namespace appCRM.Data.Entities
{
    public class Seguimiento
    {
        public int SEG_id { get; set; }
        public int USU_id { get; set; }
        public int? CLI_id { get; set; } // Cliente ID (nullable)
        public int? POC_id { get; set; } // Posible Cliente ID (nullable)
        public string SEG_tipo_seguimiento { get; set; }
        public DateTime SEG_fecha_seguimiento { get; set; }
        public string SEG_asunto { get; set; }
        public string SEG_proposito_llamada { get; set; }
        public string SEG_resultado { get; set; }
        public string SEG_comentario { get; set; }

        // Método de validación
        public bool EsValido()
        {
            // Solo uno de CLI_id o POC_id debe tener un valor, pero no ambos.
            return (CLI_id.HasValue && !POC_id.HasValue) || (!CLI_id.HasValue && POC_id.HasValue);
        }
    }
}
