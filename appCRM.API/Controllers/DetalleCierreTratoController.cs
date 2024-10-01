using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetalleCierreTratoController : ControllerBase
    {
        private readonly DetalleCierreTratoService _detalleCierreTratoService;

        public DetalleCierreTratoController(DetalleCierreTratoService detalleCierreTratoService)
        {
            _detalleCierreTratoService = detalleCierreTratoService;
        }

        // GET: api/DetalleCierreTrato
        [HttpGet]
        public IActionResult GetDetallesCierreTrato()
        {
            var detalles = _detalleCierreTratoService.GetAllDetallesCierreTrato();
            return Ok(detalles);
        }

        // GET: api/DetalleCierreTrato/5
        [HttpGet("{decId}")]
        public IActionResult GetDetalleCierreTrato(int decId)
        {
            var detalle = _detalleCierreTratoService.GetDetalleCierreTratoById(decId);
            if (detalle == null)
            {
                return NotFound();
            }
            return Ok(detalle);
        }

        // POST: api/DetalleCierreTrato
        [HttpPost]
        public IActionResult AddDetalleCierreTrato([FromBody] DetalleCierreTrato detalleCierreTrato)
        {
            if (detalleCierreTrato == null)
            {
                return BadRequest();
            }

            _detalleCierreTratoService.AddDetalleCierreTrato(detalleCierreTrato);
            return CreatedAtAction(nameof(GetDetalleCierreTrato), new { decId = detalleCierreTrato.DEC_id }, detalleCierreTrato);
        }

        // PUT: api/DetalleCierreTrato/5
        [HttpPut("{decId}")]
        public IActionResult UpdateDetalleCierreTrato(int decId, [FromBody] DetalleCierreTrato detalleCierreTrato)
        {
            if (detalleCierreTrato == null)
            {
                return BadRequest("El detalle de cierre de trato no puede ser nulo.");
            }

            var existingDetalle = _detalleCierreTratoService.GetDetalleCierreTratoById(decId);
            if (existingDetalle == null)
            {
                return NotFound();
            }

            detalleCierreTrato.DEC_id = decId; // Asegurar que el ID coincide
            _detalleCierreTratoService.UpdateDetalleCierreTrato(detalleCierreTrato);

            return NoContent();
        }

        // DELETE: api/DetalleCierreTrato/5
        [HttpDelete("{decId}")]
        public IActionResult DeleteDetalleCierreTrato(int decId)
        {
            var detalle = _detalleCierreTratoService.GetDetalleCierreTratoById(decId);
            if (detalle == null)
            {
                return NotFound();
            }

            _detalleCierreTratoService.DeleteDetalleCierreTrato(decId);
            return NoContent();
        }
    }
}
