using appCRM.Data;
using appCRM.Data.Entities;
using System.Collections.Generic;
using System;

namespace appCRM.Business.Services
{
    public class DetalleCotizacionService
    {
        private readonly AppCRMContext _context;

        public DetalleCotizacionService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<DetalleCotizacion> GetAllDetallesCotizacion()
        {
            return _context.DetalleCotizaciones.ToList();
        }

        public DetalleCotizacion? GetDetalleCotizacionById(int detId)
        {
            return _context.DetalleCotizaciones.Find(detId);
        }

        public void AddDetalleCotizacion(DetalleCotizacion detalleCotizacion)
        {
            if (detalleCotizacion == null)
            {
                throw new ArgumentNullException(nameof(detalleCotizacion));
            }
            _context.DetalleCotizaciones.Add(detalleCotizacion);
            _context.SaveChanges();
        }

        public void UpdateDetalleCotizacion(DetalleCotizacion detalleCotizacion)
        {
            if (detalleCotizacion == null)
            {
                throw new ArgumentNullException(nameof(detalleCotizacion));
            }

            var existingDetalle = _context.DetalleCotizaciones.Find(detalleCotizacion.DET_id);
            if (existingDetalle != null)
            {
                existingDetalle.COT_id = detalleCotizacion.COT_id;
                existingDetalle.SER_id = detalleCotizacion.SER_id;
                existingDetalle.DET_cantidad = detalleCotizacion.DET_cantidad;
                existingDetalle.DET_precio = detalleCotizacion.DET_precio;
                existingDetalle.DET_descuento = detalleCotizacion.DET_descuento;
                existingDetalle.DET_tipo_descuento = detalleCotizacion.DET_tipo_descuento;
                existingDetalle.DET_subtotal = detalleCotizacion.DET_subtotal;

                _context.Entry(existingDetalle).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"No se encontró un detalle de cotización con ID {detalleCotizacion.DET_id}.");
            }
        }

        public void DeleteDetalleCotizacion(int detId)
        {
            var detalleCotizacion = _context.DetalleCotizaciones.Find(detId);
            if (detalleCotizacion != null)
            {
                _context.DetalleCotizaciones.Remove(detalleCotizacion);
                _context.SaveChanges();
            }
        }
    }
}
