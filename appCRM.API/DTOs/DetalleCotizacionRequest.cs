namespace appCRM.API.DTOs
{
    public class DetalleCotizacionRequest
    {
        public int COT_id { get; set; } // ID de la cotización
        public int DET_id { get; set; } // ID del detalle de cotización
        public List<DetalleCotizacionItem> DetalleCotizacion { get; set; } // Lista de detalles de cotización
    }

    public class DetalleCotizacionItem
    {
        public int SER_id { get; set; } // ID del servicio
        public decimal DET_cantidad { get; set; } // Cantidad
        public decimal DET_precio { get; set; } // Precio
        public decimal DET_descuento { get; set; } // Descuento
        public string DET_tipo_descuento { get; set; } // Tipo de descuento
        public decimal DET_subtotal { get; set; } // Subtotal
    }
}
