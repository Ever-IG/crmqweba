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
    public class PosibleClienteController : ControllerBase
    {
        private readonly PosibleClienteService _posibleClienteService;

        public PosibleClienteController(PosibleClienteService posibleClienteService)
        {
            _posibleClienteService = posibleClienteService;
        }

        // GET: api/PosibleCliente
        [HttpGet]
        public IActionResult GetPosiblesClientes()
        {
            var posiblesClientes = _posibleClienteService.GetAllPosiblesClientes();
            return Ok(posiblesClientes);
        }

        // GET: api/PosibleCliente/5
        [HttpGet("{POC_id}")]
        public IActionResult GetPosibleCliente(int POC_id)
        {
            var posibleCliente = _posibleClienteService.GetPosibleClienteById(POC_id);
            if (posibleCliente == null)
            {
                return NotFound();
            }
            return Ok(posibleCliente);
        }

        // POST: api/PosibleCliente
        [HttpPost]
        public IActionResult AddPosibleCliente([FromBody] PosibleCliente posibleCliente)
        {
            if (posibleCliente == null)
            {
                return BadRequest();
            }

            _posibleClienteService.AddPosibleCliente(posibleCliente);
            return CreatedAtAction(nameof(GetPosibleCliente), new { POC_id = posibleCliente.POC_id }, posibleCliente);
        }

        // PUT: api/PosibleCliente/5
        [HttpPut("{POC_id}")]
        public IActionResult UpdatePosibleCliente(int POC_id, [FromBody] PosibleCliente posibleCliente)
        {
            if (posibleCliente == null )
            {
                return BadRequest();
            }

            var existingPosibleCliente = _posibleClienteService.GetPosibleClienteById(POC_id);
            if (existingPosibleCliente == null)
            {
                return NotFound();
            }

            _posibleClienteService.UpdatePosibleCliente(posibleCliente);
            return NoContent();
        }

        // DELETE: api/PosibleCliente/5
        [HttpDelete("{POC_id}")]
        public IActionResult DeletePosibleCliente(int POC_id)
        {
            var posibleCliente = _posibleClienteService.GetPosibleClienteById(POC_id);
            if (posibleCliente == null)
            {
                return NotFound();
            }

            _posibleClienteService.DeletePosibleCliente(POC_id);
            return NoContent();
        }
    }
}
