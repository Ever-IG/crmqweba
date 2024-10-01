using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;
using appCRM.API.DTOs;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetalleCotizacionController : ControllerBase
    {
        private readonly DetalleCotizacionService _detalleCotizacionService;

        public DetalleCotizacionController(DetalleCotizacionService detalleCotizacionService)
        {
            _detalleCotizacionService = detalleCotizacionService;
        }

        // GET: api/DetalleCotizacion
        [HttpGet]
        public IActionResult GetDetallesCotizacion()
        {
            var detalles = _detalleCotizacionService.GetAllDetallesCotizacion();
            return Ok(detalles);
        }

        // GET: api/DetalleCotizacion/5
        [HttpGet("{detId}")]
        public IActionResult GetDetalleCotizacion(int detId)
        {
            var detalle = _detalleCotizacionService.GetDetalleCotizacionById(detId);
            if (detalle == null)
            {
                return NotFound();
            }
            return Ok(detalle);
        }

        [HttpPost]
        public IActionResult AddCotizacionWithDetalles([FromBody] DetalleCotizacionRequest cotizacionRequest)
        {
            if (cotizacionRequest == null || cotizacionRequest.DetalleCotizacion == null || cotizacionRequest.DetalleCotizacion.Count == 0)
            {
                return BadRequest("La solicitud no puede ser nula o vacía.");
            }

            // Convierte los detalles a la entidad DetalleCotizacion y asigna el COT_id
            var detallesCotizacion = cotizacionRequest.DetalleCotizacion.Select(d => new DetalleCotizacion
            {
                COT_id = cotizacionRequest.COT_id,
                SER_id = d.SER_id,
                DET_cantidad = d.DET_cantidad,
                DET_precio = d.DET_precio,
                DET_descuento = d.DET_descuento,
                DET_tipo_descuento = d.DET_tipo_descuento,
                DET_subtotal = d.DET_subtotal
            }).ToList();

            // Llama al servicio para agregar los detalles
            _detalleCotizacionService.AddDetallesCotizacion(detallesCotizacion);

            return Ok(detallesCotizacion);
        }


        [HttpPut("{cotizacionId}")]
        public IActionResult UpdateDetallesCotizacion(int cotizacionId, [FromBody] List<DetalleCotizacion> detallesCotizacion)
        {
            if (detallesCotizacion == null || !detallesCotizacion.Any())
            {
                return BadRequest("La lista de detalles no puede ser nula o vacía.");
            }

            try
            {
                // Aseguramos que todos los detalles tengan el mismo cotizacionId
                foreach (var detalle in detallesCotizacion)
                {
                    detalle.COT_id = cotizacionId;
                }

                _detalleCotizacionService.UpdateDetallesCotizacion(detallesCotizacion);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al actualizar los detalles de cotización: {ex.Message}");
            }
        }


        // DELETE: api/DetalleCotizacion/5
        // DELETE: api/DetalleCotizacion
        [HttpDelete]
        public IActionResult DeleteDetallesCotizacion([FromBody] List<int> detalleIds)
        {
            if (detalleIds == null || !detalleIds.Any())
            {
                return BadRequest("La lista de IDs de detalles no puede ser nula o vacía.");
            }

            try
            {
                // Llamamos al servicio para eliminar todos los detalles que coincidan con los IDs proporcionados
                _detalleCotizacionService.DeleteDetallesCotizacion(detalleIds);
                return NoContent(); // 204 No Content si la operación fue exitosa
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al eliminar los detalles de cotización: {ex.Message}");
            }
        }

    }
}
