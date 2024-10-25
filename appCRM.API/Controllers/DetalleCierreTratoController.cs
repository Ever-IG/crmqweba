using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;
using appCRM.API.DTOs;

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


        [HttpPost]
        public IActionResult AddCierreTratoWithDetalles([FromBody] DetalleCierreTratoRequest cierreTratoRequest)
        {
            if (cierreTratoRequest == null || cierreTratoRequest.DetalleCierreTrato == null || cierreTratoRequest.DetalleCierreTrato.Count == 0)
            {
                return BadRequest("La solicitud no puede ser nula o vacía.");
            }

            try
            {
                var detallesCierreTrato = cierreTratoRequest.DetalleCierreTrato.Select(d => new DetalleCierreTrato
                {
                    CIE_id = cierreTratoRequest.CIE_id,
                    SER_id = d.SER_id,
                    DEC_cantidad = d.DEC_cantidad,
                    DEC_precio = d.DEC_precio,
                    DEC_descuento = d.DEC_descuento,
                    DEC_tipo_descuento = d.DEC_tipo_descuento,
                    DEC_subtotal = d.DEC_subtotal
                }).ToList();

                _detalleCierreTratoService.AddDetalleCierreTrato(detallesCierreTrato);

                return Ok(detallesCierreTrato);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        // PUT: api/DetalleCierreTrato/{decId}
        [HttpPut("{decId}")]
        public IActionResult UpdateDetallesCierreTrato(int decId, [FromBody] List<DetalleCierreTrato> detallesCierreTrato)
        {
            if (detallesCierreTrato == null || !detallesCierreTrato.Any())
            {
                return BadRequest("La lista de detalles de cierre de trato no puede ser nula o vacía.");
            }

            try
            {
                // Aseguramos que todos los detalles pertenecen al mismo decId
                foreach (var detalle in detallesCierreTrato)
                {
                    detalle.DEC_id = decId; // Asegurar que el ID coincide en todos los detalles
                }

                // Llamamos al servicio para actualizar todos los detalles
                _detalleCierreTratoService.UpdateDetallesCierreTrato(detallesCierreTrato);

                return NoContent(); // Devuelve NoContent (204) si la operación fue exitosa
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al actualizar los detalles de cierre de trato: {ex.Message}");
            }
        }


        // DELETE: api/DetalleCierreTrato/5
        // DELETE: api/DetalleCierreTrato
        [HttpDelete]
        public IActionResult DeleteDetallesCierreTrato([FromBody] List<int> decIds)
        {
            if (decIds == null || !decIds.Any())
            {
                return BadRequest("La lista de IDs de detalles no puede ser nula o vacía.");
            }

            try
            {
                // Llamamos al servicio para eliminar todos los detalles que coincidan con los IDs proporcionados
                _detalleCierreTratoService.DeleteDetallesCierreTrato(decIds);
                return NoContent(); // 204 No Content si la operación fue exitosa
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Ocurrió un error al eliminar los detalles de cierre de trato: {ex.Message}");
            }
        }
    }
}