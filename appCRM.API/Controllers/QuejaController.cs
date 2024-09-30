using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appCRM.Business.Services;
using appCRM.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuejaController : ControllerBase
    {
         private readonly QuejaService _quejaService;

        public QuejaController(QuejaService quejaService)
        {
            _quejaService = quejaService;
        }

        // GET: api/Queja
        [HttpGet]
        public IActionResult GetQuejas()
        {
            var quejas = _quejaService.GetAllQuejas();
            return Ok(quejas);
        }

        // GET: api/Queja/5
        [HttpGet("{QUE_id}")]
        public IActionResult GetQueja(int QUE_id)
        {
            var queja = _quejaService.GetQuejaById(QUE_id);
            if (queja == null)
            {
                return NotFound();
            }
            return Ok(queja);
        }

        // POST: api/Queja
        [HttpPost]
        public IActionResult AddQueja([FromBody] Queja queja)
        {
            if (queja == null)
            {
                return BadRequest();
            }

            _quejaService.AddQueja(queja);
            return CreatedAtAction(nameof(GetQueja), new { QUE_id = queja.QUE_id }, queja);
        }

   // PUT: api/Queja/5
[HttpPut("{QUE_id}")]
public IActionResult UpdateQueja(int QUE_id, [FromBody] Queja queja)
{
    if (queja == null)
    {
        return BadRequest();
    }

    var existingQueja = _quejaService.GetQuejaById(QUE_id);
    if (existingQueja == null)
    {
        return NotFound();
    }

    existingQueja.CLI_id = queja.CLI_id;
    existingQueja.USU_id = queja.USU_id;
    existingQueja.QUE_prioridad = queja.QUE_prioridad;
    existingQueja.QUE_fecha_queja = queja.QUE_fecha_queja;
    existingQueja.QUE_motivo = queja.QUE_motivo;
    existingQueja.QUE_estado = queja.QUE_estado;
    existingQueja.QUE_descripcion = queja.QUE_descripcion;

    _quejaService.UpdateQueja(existingQueja);
    return NoContent();
}


        // DELETE: api/Queja/5
        [HttpDelete("{QUE_id}")]
        public IActionResult DeleteQueja(int QUE_id)
        {
            var queja = _quejaService.GetQuejaById(QUE_id);
            if (queja == null)
            {
                return NotFound();
            }

            _quejaService.DeleteQueja(QUE_id);
            return NoContent();
        }
    }
}