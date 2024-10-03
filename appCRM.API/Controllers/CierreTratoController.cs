using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CierreTratoController : ControllerBase
    {
        private readonly CierreTratoService _cierreTratoService;

        public CierreTratoController(CierreTratoService cierreTratoService)
        {
            _cierreTratoService = cierreTratoService;
        }

        // GET: api/CierreTrato
        [HttpGet]
        public IActionResult GetCierreTratos()
        {
            var cierres = _cierreTratoService.GetAllCierresTrato();
            return Ok(cierres);
        }

        // GET: api/CierreTrato/5
        [HttpGet("{CIE_id}")]
        public IActionResult GetCierreTrato(int CIE_id)
        {
            var cierre = _cierreTratoService.GetCierreTratoById(CIE_id);
            if (cierre == null)
            {
                return NotFound();
            }
            return Ok(cierre);
        }

        // POST: api/CierreTrato
        [HttpPost]
        public IActionResult AddCierreTrato([FromBody] CierreTrato cierreTrato)
        {
            if (cierreTrato == null)
            {
                return BadRequest();
            }

            try
            {
                _cierreTratoService.AddCierreTrato(cierreTrato);
                return CreatedAtAction(nameof(GetCierreTrato), new { cierreTrato.CIE_id }, cierreTrato);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/CierreTrato/5
        [HttpPut("{CIE_id}")]
        public IActionResult UpdateCierreTrato(int CIE_id, [FromBody] CierreTrato cierreTrato)
        {
            if (cierreTrato == null)
            {
                return BadRequest();
            }

            var existingCierre = _cierreTratoService.GetCierreTratoById(CIE_id);
            if (existingCierre == null)
            {
                return NotFound();
            }

            _cierreTratoService.UpdateCierreTrato(cierreTrato);
            return NoContent();
        }

        // DELETE: api/CierreTrato/5
        [HttpDelete("{CIE_id}")]
        public IActionResult DeleteCierreTrato(int CIE_id)
        {
            var cierre = _cierreTratoService.GetCierreTratoById(CIE_id);
            if (cierre == null)
            {
                return NotFound();
            }

            _cierreTratoService.DeleteCierreTrato(CIE_id);
            return NoContent();
        }
    }
}
