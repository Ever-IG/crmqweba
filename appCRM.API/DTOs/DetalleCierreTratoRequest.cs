namespace appCRM.API.DTOs
{
    public class DetalleCierreTratoRequest
    {
        public int DEC_id { get; set; }
        public int CIE_id { get; set; } 
        public List<DetalleCierreTratoItem> DetalleCierreTrato { get; set; } // Lista de detalles de cotización
    }

    public class DetalleCierreTratoItem
    {
        public int SER_id { get; set; } // ID del servicio
        public decimal DEC_cantidad { get; set; } // Cantidad
        public decimal DEC_precio { get; set; } // Precio
        public decimal DEC_descuento { get; set; } // Descuento
        public string DEC_tipo_descuento { get; set; } // Tipo de descuento
        public decimal DEC_subtotal { get; set; } // Subtotal
    }
}
