using appCRM.Data;
using appCRM.Data.Entities;
using System.Collections.Generic;
using System.Linq;
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

        // Obtener todos los detalles de cotización
        public IEnumerable<DetalleCotizacion> GetAllDetallesCotizacion()
        {
            return _context.DetalleCotizaciones.ToList();
        }

        // Obtener un detalle de cotización por ID
        public DetalleCotizacion? GetDetalleCotizacionById(int detId)
        {
            return _context.DetalleCotizaciones.Find(detId);
        }

        // Agregar múltiples detalles de cotización
        public void AddDetallesCotizacion(List<DetalleCotizacion> detallesCotizacion)
        {
            if (detallesCotizacion == null || detallesCotizacion.Count == 0)
            {
                throw new ArgumentNullException(nameof(detallesCotizacion), "La lista de detalles no puede ser nula o vacía.");
            }

            try
            {
                // Agregar el rango de detalles a la base de datos
                _context.DetalleCotizaciones.AddRange(detallesCotizacion);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception("Error al agregar los detalles de la cotización.", ex);
            }
        }

        // Actualizar 
        public void UpdateDetallesCotizacion(List<DetalleCotizacion> detallesCotizacion)
        {
            if (detallesCotizacion == null || !detallesCotizacion.Any())
            {
                throw new ArgumentNullException(nameof(detallesCotizacion), "La lista de detalles no puede ser nula o vacía.");
            }

            foreach (var detalle in detallesCotizacion)
            {
                var existingDetalle = _context.DetalleCotizaciones.Find(detalle.DET_id);
                if (existingDetalle != null)
                {
                    // Actualizamos los campos del detalle existente
                    existingDetalle.COT_id = detalle.COT_id;
                    existingDetalle.SER_id = detalle.SER_id;
                    existingDetalle.DET_cantidad = detalle.DET_cantidad;
                    existingDetalle.DET_precio = detalle.DET_precio;
                    existingDetalle.DET_descuento = detalle.DET_descuento;
                    existingDetalle.DET_tipo_descuento = detalle.DET_tipo_descuento;
                    existingDetalle.DET_subtotal = detalle.DET_subtotal;

                    // Marcamos el detalle como modificado
                    _context.Entry(existingDetalle).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                }
                else
                {
                    throw new KeyNotFoundException($"No se encontró un detalle de cotización con ID {detalle.DET_id}.");
                }
            }

            // Guardamos todos los cambios al final, después de modificar todas las entradas
            _context.SaveChanges();
        }


        // Eliminar un detalle de cotización por ID
        public void DeleteDetallesCotizacion(List<int> detalleIds)
        {
            if (detalleIds == null || !detalleIds.Any())
            {
                throw new ArgumentNullException(nameof(detalleIds), "La lista de IDs no puede ser nula o vacía.");
            }

            // Obtenemos todos los detalles correspondientes a los IDs proporcionados
            var detallesToDelete = _context.DetalleCotizaciones
                                          .Where(d => detalleIds.Contains(d.DET_id))
                                          .ToList();

            if (!detallesToDelete.Any())
            {
                throw new KeyNotFoundException("No se encontraron detalles con los IDs proporcionados.");
            }

            // Eliminamos los detalles encontrados
            _context.DetalleCotizaciones.RemoveRange(detallesToDelete);
            _context.SaveChanges(); // Guardamos los cambios en la base de datos
        }

    }
}
