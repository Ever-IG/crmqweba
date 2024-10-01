using appCRM.Data;
using appCRM.Data.Entities;
using System.Collections.Generic;
using System;

namespace appCRM.Business.Services
{
    public class DetalleCierreTratoService
    {
        private readonly AppCRMContext _context;

        public DetalleCierreTratoService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<DetalleCierreTrato> GetAllDetallesCierreTrato()
        {
            return _context.DetalleCierreTratos.ToList();
        }

        public DetalleCierreTrato? GetDetalleCierreTratoById(int decId)
        {
            return _context.DetalleCierreTratos.Find(decId);
        }

        public void AddDetalleCierreTrato(DetalleCierreTrato detalleCierreTrato)
        {
            if (detalleCierreTrato == null)
            {
                throw new ArgumentNullException(nameof(detalleCierreTrato));
            }
            _context.DetalleCierreTratos.Add(detalleCierreTrato);
            _context.SaveChanges();
        }

        public void UpdateDetalleCierreTrato(DetalleCierreTrato detalleCierreTrato)
        {
            if (detalleCierreTrato == null)
            {
                throw new ArgumentNullException(nameof(detalleCierreTrato));
            }

            var existingDetalle = _context.DetalleCierreTratos.Find(detalleCierreTrato.DEC_id);
            if (existingDetalle != null)
            {
                existingDetalle.CIE_id = detalleCierreTrato.CIE_id;
                existingDetalle.SER_id = detalleCierreTrato.SER_id;
                existingDetalle.DEC_cantidad = detalleCierreTrato.DEC_cantidad;
                existingDetalle.DEC_precio = detalleCierreTrato.DEC_precio;
                existingDetalle.DEC_descuento = detalleCierreTrato.DEC_descuento;
                existingDetalle.DEC_tipo_descuento = detalleCierreTrato.DEC_tipo_descuento;
                existingDetalle.DEC_subtotal = detalleCierreTrato.DEC_subtotal;

                _context.Entry(existingDetalle).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"No se encontró un detalle de cierre de trato con ID {detalleCierreTrato.DEC_id}.");
            }
        }

        public void DeleteDetalleCierreTrato(int decId)
        {
            var detalleCierreTrato = _context.DetalleCierreTratos.Find(decId);
            if (detalleCierreTrato != null)
            {
                _context.DetalleCierreTratos.Remove(detalleCierreTrato);
                _context.SaveChanges();
            }
        }
    }
}
