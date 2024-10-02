using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CotizacionController : ControllerBase
    {
        private readonly CotizacionService _cotizacionService;

        public CotizacionController(CotizacionService cotizacionService)
        {
            _cotizacionService = cotizacionService;
        }

        // GET: api/Cotizacion
        [HttpGet]
        public IActionResult GetCotizaciones()
        {
            var cotizaciones = _cotizacionService.GetAllCotizaciones();
            return Ok(cotizaciones);
        }

        // GET: api/Cotizacion/5
        [HttpGet("{COT_id}")]
        public IActionResult GetCotizacion(int COT_id)
        {
            var cotizacion = _cotizacionService.GetCotizacionById(COT_id);
            if (cotizacion == null)
            {
                return NotFound();
            }
            return Ok(cotizacion);
        }

        // POST: api/Cotizacion
        [HttpPost]
        public IActionResult AddCotizacion([FromBody] Cotizacion cotizacion)
        {
            if (cotizacion == null)
            {
                return BadRequest();
            }

            try
            {
                _cotizacionService.AddCotizacion(cotizacion);
                return CreatedAtAction(nameof(GetCotizacion), new { cotizacion.COT_id }, cotizacion);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

[HttpPut("{COT_id}")]
public IActionResult UpdateCotizacion(int COT_id, [FromBody] Cotizacion cotizacion)
{
    if (cotizacion == null)
    {
        return BadRequest();
    }

    var existingCotizacion = _cotizacionService.GetCotizacionById(COT_id);
    if (existingCotizacion == null)
    {
        return NotFound();
    }

    existingCotizacion.COT_numero = cotizacion.COT_numero;
    existingCotizacion.COT_fecha_cotizacion = cotizacion.COT_fecha_cotizacion;
    existingCotizacion.COT_fecha_vencimiento = cotizacion.COT_fecha_vencimiento;
    existingCotizacion.USU_id = cotizacion.USU_id;
    existingCotizacion.clI_id = cotizacion.clI_id;
    existingCotizacion.COT_asunto = cotizacion.COT_asunto;
    existingCotizacion.COT_total = cotizacion.COT_total;
    existingCotizacion.COT_estado = cotizacion.COT_estado;

    _cotizacionService.UpdateCotizacion(existingCotizacion);
    return NoContent();
}


        // DELETE: api/Cotizacion/5
        [HttpDelete("{COT_id}")]
        public IActionResult DeleteCotizacion(int COT_id)
        {
            var cotizacion = _cotizacionService.GetCotizacionById(COT_id);
            if (cotizacion == null)
            {
                return NotFound();
            }

            _cotizacionService.DeleteCotizacion(COT_id);
            return NoContent();
        }
    }
}
