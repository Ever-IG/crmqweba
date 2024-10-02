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
    public class ProveedorController : ControllerBase
    {
        
         private readonly ProveedorService _proveedorService;

        public ProveedorController(ProveedorService proveedorService)
        {
            _proveedorService = proveedorService;
        }

        // GET: api/Proveedor
        [HttpGet]
        public IActionResult GetProveedores()
        {
            var proveedores = _proveedorService.GetAllProveedores();
            return Ok(proveedores);
        }

        // GET: api/Proveedor/5
        [HttpGet("{PRO_id}")]
        public IActionResult GetProveedor(int PRO_id)
        {
            var proveedor = _proveedorService.GetProveedorById(PRO_id);
            if (proveedor == null)
            {
                return NotFound();
            }
            return Ok(proveedor);
        }

        // POST: api/Proveedor
        [HttpPost]
        public IActionResult AddProveedor([FromBody] Proveedor proveedor)
        {
            if (proveedor == null)
            {
                return BadRequest();
            }

            _proveedorService.AddProveedor(proveedor);
            return CreatedAtAction(nameof(GetProveedor), new { PRO_id = proveedor.PRO_id }, proveedor);
        }

        // PUT: api/Proveedor/5
        [HttpPut("{PRO_id}")]
        public IActionResult UpdateProveedor(int PRO_id, [FromBody] Proveedor proveedor)
        {
            if (proveedor == null )
            {
                return BadRequest();
            }

            var existingProveedor = _proveedorService.GetProveedorById(PRO_id);
            if (existingProveedor == null)
            {
                return NotFound();
            }

            _proveedorService.UpdateProveedor(proveedor);
            return NoContent();
        }

        // DELETE: api/Proveedor/5
        [HttpDelete("{PRO_id}")]
        public IActionResult DeleteProveedor(int PRO_id)
        {
            var proveedor = _proveedorService.GetProveedorById(PRO_id);
            if (proveedor == null)
            {
                return NotFound();
            }

            _proveedorService.DeleteProveedor(PRO_id);
            return NoContent();
        }

    }
}