namespace appCRM.Data.Entities
{
    public class CierreTrato
    {
        public int CIE_id { get; set; } // ID del cierre de trato, clave primaria
        public string CIE_numero { get; set; } // Número del cierre de trato
        public DateTime CIE_fecha_venta { get; set; } // Fecha de la venta
        public DateTime CIE_fecha_vencimiento { get; set; } // Fecha de vencimiento del cierre de trato
        public string CIE_estado { get; set; } // Estado del cierre de trato
        public int USU_id { get; set; } // Clave foránea al usuario
        public int CLI_id { get; set; } // Clave foránea al cliente
        public string CIE_asunto { get; set; } // Asunto relacionado con el cierre de trato
        public decimal CIE_total { get; set; } // Total del cierre de trato
    
    }
}
