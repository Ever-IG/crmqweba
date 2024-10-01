namespace appCRM.Data.Entities
{
    public class DetalleCierreTrato
    {
        public int DEC_id { get; set; } // Clave primaria
        public int CIE_id { get; set; } // ID de cierre de trato
        public int SER_id { get; set; } // ID de servicio
        public decimal DEC_cantidad { get; set; } // Cantidad
        public decimal DEC_precio { get; set; } // Precio
        public decimal DEC_descuento { get; set; } // Descuento
        public string DEC_tipo_descuento { get; set; } // Tipo de descuento
        public decimal DEC_subtotal { get; set; } // Subtotal
    }
}
