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

        public void AddDetalleCierreTrato(List<DetalleCierreTrato> detallesCierreTrato)
        {
            if (detallesCierreTrato == null || detallesCierreTrato.Count == 0)
            {
                throw new ArgumentNullException(nameof(detallesCierreTrato), "La lista de detalles no puede ser nula o vacía.");
            }

            try
            {
                // Agrega los detalles a la base de datos
                _context.DetalleCierreTratos.AddRange(detallesCierreTrato);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar los detalles del cierre de trato.", ex);
            }
        }

        public void UpdateDetallesCierreTrato(List<DetalleCierreTrato> detallesCierreTrato)
        {
            if (detallesCierreTrato == null || !detallesCierreTrato.Any())
            {
                throw new ArgumentNullException(nameof(detallesCierreTrato), "La lista de detalles no puede ser nula o vacía.");
            }

            foreach (var detalle in detallesCierreTrato)
            {
                var existingDetalle = _context.DetalleCierreTratos.Find(detalle.DEC_id);
                if (existingDetalle != null)
                {
                    // Actualizamos los campos del detalle existente
                    existingDetalle.CIE_id = detalle.CIE_id;
                    existingDetalle.SER_id = detalle.SER_id;
                    existingDetalle.DEC_cantidad = detalle.DEC_cantidad;
                    existingDetalle.DEC_precio = detalle.DEC_precio;
                    existingDetalle.DEC_descuento = detalle.DEC_descuento;
                    existingDetalle.DEC_tipo_descuento = detalle.DEC_tipo_descuento;
                    existingDetalle.DEC_subtotal = detalle.DEC_subtotal;

                    _context.Entry(existingDetalle).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                }
                else
                {
                    throw new KeyNotFoundException($"No se encontró un detalle de cierre de trato con ID {detalle.DEC_id}.");
                }
            }

            // Guardamos todos los cambios al final, después de modificar todas las entradas
            _context.SaveChanges();
        }


        public void DeleteDetallesCierreTrato(List<int> decIds)
        {
            if (decIds == null || !decIds.Any())
            {
                throw new ArgumentNullException(nameof(decIds), "La lista de IDs no puede ser nula o vacía.");
            }

            // Obtenemos todos los detalles correspondientes a los IDs proporcionados
            var detallesToDelete = _context.DetalleCierreTratos
                                          .Where(d => decIds.Contains(d.DEC_id))
                                          .ToList();

            if (!detallesToDelete.Any())
            {
                throw new KeyNotFoundException("No se encontraron detalles con los IDs proporcionados.");
            }

            // Eliminamos los detalles encontrados
            _context.DetalleCierreTratos.RemoveRange(detallesToDelete);
            _context.SaveChanges(); // Guardamos los cambios en la base de datos
        }

    }

}
