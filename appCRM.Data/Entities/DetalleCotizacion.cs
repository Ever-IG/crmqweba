namespace appCRM.Data.Entities
{
    public class DetalleCotizacion
    {
        public int DET_id { get; set; } // Clave primaria
        public int COT_id { get; set; } // ID de cotización
        public int SER_id { get; set; } // ID de servicio
        public decimal DET_cantidad { get; set; } // Cantidad
        public decimal DET_precio { get; set; } // Precio
        public decimal DET_descuento { get; set; } // Descuento
        public string DET_tipo_descuento { get; set; } // Tipo de descuento
        public decimal DET_subtotal { get; set; } // Subtotal
    }
}
