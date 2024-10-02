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
    public class CanalVentaController : ControllerBase
    {

        private readonly CanalVentaService _canalVentaService;

        public CanalVentaController(CanalVentaService canalVentaService)
        {
            _canalVentaService = canalVentaService;
        }

        // GET: api/CanalVenta
        [HttpGet]
        public IActionResult GetCanalesVenta()
        {
            var canalesVenta = _canalVentaService.GetAllCanalesVenta();
            return Ok(canalesVenta);
        }

        // GET: api/CanalVenta/5
        [HttpGet("{CVE_id}")]
        public IActionResult GetCanalVenta(int CVE_id)
        {
            var canalVenta = _canalVentaService.GetCanalVentaById(CVE_id);
            if (canalVenta == null)
            {
                return NotFound();
            }
            return Ok(canalVenta);
        }

        // POST: api/CanalVenta
        [HttpPost]
        public IActionResult AddCanalVenta([FromBody] CanalVenta canalVenta)
        {
            if (canalVenta == null)
            {
                return BadRequest();
            }

            _canalVentaService.AddCanalVenta(canalVenta);
            return CreatedAtAction(nameof(GetCanalVenta), new { CVE_id = canalVenta.CVE_id }, canalVenta);
        }

        // PUT: api/CanalVenta/5
        [HttpPut("{CVE_id}")]
        public IActionResult UpdateCanalVenta(int CVE_id, [FromBody] CanalVenta canalVenta)
        {
            if (canalVenta == null)
            {
                return BadRequest();
            }

            var existingCanalVenta = _canalVentaService.GetCanalVentaById(CVE_id);
            if (existingCanalVenta == null)
            {
                return NotFound();
            }

            _canalVentaService.UpdateCanalVenta(canalVenta);
            return Ok(new { message = "Servicio actualizado exitosamente." });
        }

        // DELETE: api/CanalVenta/5
        [HttpDelete("{CVE_id}")]
        public IActionResult DeleteCanalVenta(int CVE_id)
        {
            var canalVenta = _canalVentaService.GetCanalVentaById(CVE_id);
            if (canalVenta == null)
            {
                return NotFound();
            }

            _canalVentaService.DeleteCanalVenta(CVE_id);
            return NoContent();
        }



    }
}