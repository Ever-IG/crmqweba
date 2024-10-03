using System.Collections.Generic;
using appCRM.Business.Services;
using appCRM.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SeguimientoController : ControllerBase
    {
        private readonly SeguimientoService _seguimientoService;

        public SeguimientoController(SeguimientoService seguimientoService)
        {
            _seguimientoService = seguimientoService;
        }

        // GET: api/Seguimiento
        [HttpGet]
        public IActionResult GetSeguimientos()
        {
            var seguimientos = _seguimientoService.GetAllSeguimientos();
            return Ok(seguimientos);
        }

        // GET: api/Seguimiento/5
        [HttpGet("{SEG_id}")]
        public IActionResult GetSeguimiento(int SEG_id)
        {
            var seguimiento = _seguimientoService.GetSeguimientoById(SEG_id);
            if (seguimiento == null)
            {
                return NotFound();
            }
            return Ok(seguimiento);
        }

        // POST: api/Seguimiento
        [HttpPost]
        public IActionResult AddSeguimiento([FromBody] Seguimiento seguimiento)
        {
            if (seguimiento == null || !seguimiento.EsValido())
            {
                return BadRequest("Debe proporcionar un Cliente o un Posible Cliente, pero no ambos.");
            }

            _seguimientoService.AddSeguimiento(seguimiento);
            return CreatedAtAction(nameof(GetSeguimiento), new { SEG_id = seguimiento.SEG_id }, seguimiento);
        }

        [HttpPut("{SEG_id}")]
        public IActionResult UpdateSeguimiento(int SEG_id, [FromBody] Seguimiento seguimiento)
        {
            if (seguimiento == null || !seguimiento.EsValido())
            {
                return BadRequest("Debe proporcionar un Cliente o un Posible Cliente, pero no ambos.");
            }

            var existingSeguimiento = _seguimientoService.GetSeguimientoById(SEG_id);
            if (existingSeguimiento == null)
            {
                return NotFound();
            }

            // Actualizar los campos
            existingSeguimiento.USU_id = seguimiento.USU_id;
            existingSeguimiento.CLI_id = seguimiento.CLI_id;
            existingSeguimiento.POC_id = seguimiento.POC_id;
            existingSeguimiento.SEG_tipo_seguimiento = seguimiento.SEG_tipo_seguimiento;
            existingSeguimiento.SEG_fecha_seguimiento = seguimiento.SEG_fecha_seguimiento;
            existingSeguimiento.SEG_asunto = seguimiento.SEG_asunto;
            existingSeguimiento.SEG_proposito_llamada = seguimiento.SEG_proposito_llamada;
            existingSeguimiento.SEG_resultado = seguimiento.SEG_resultado;
            existingSeguimiento.SEG_comentario = seguimiento.SEG_comentario;

            _seguimientoService.UpdateSeguimiento(existingSeguimiento);

            return NoContent();
        }

        // DELETE: api/Seguimiento/5
        [HttpDelete("{SEG_id}")]
        public IActionResult DeleteSeguimiento(int SEG_id)
        {
            var seguimiento = _seguimientoService.GetSeguimientoById(SEG_id);
            if (seguimiento == null)
            {
                return NotFound();
            }

            _seguimientoService.DeleteSeguimiento(SEG_id);
            return NoContent();
        }
    }
}