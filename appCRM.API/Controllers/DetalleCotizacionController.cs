using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

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

        // POST: api/DetalleCotizacion
        [HttpPost]
        public IActionResult AddDetalleCotizacion([FromBody] DetalleCotizacion detalleCotizacion)
        {
            if (detalleCotizacion == null)
            {
                return BadRequest();
            }

            _detalleCotizacionService.AddDetalleCotizacion(detalleCotizacion);
            return CreatedAtAction(nameof(GetDetalleCotizacion), new { detId = detalleCotizacion.DET_id }, detalleCotizacion);
        }

        // PUT: api/DetalleCotizacion/5
        [HttpPut("{detId}")]
        public IActionResult UpdateDetalleCotizacion(int detId, [FromBody] DetalleCotizacion detalleCotizacion)
        {
            if (detalleCotizacion == null)
            {
                return BadRequest("El detalle de cotización no puede ser nulo.");
            }

            var existingDetalle = _detalleCotizacionService.GetDetalleCotizacionById(detId);
            if (existingDetalle == null)
            {
                return NotFound();
            }

            detalleCotizacion.DET_id = detId; // Asegurar que el ID coincide
            _detalleCotizacionService.UpdateDetalleCotizacion(detalleCotizacion);

            return NoContent();
        }

        // DELETE: api/DetalleCotizacion/5
        [HttpDelete("{detId}")]
        public IActionResult DeleteDetalleCotizacion(int detId)
        {
            var detalle = _detalleCotizacionService.GetDetalleCotizacionById(detId);
            if (detalle == null)
            {
                return NotFound();
            }

            _detalleCotizacionService.DeleteDetalleCotizacion(detId);
            return NoContent();
        }
    }
}
