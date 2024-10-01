using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermisoController : ControllerBase
    {
        private readonly PermisoService _permisoService;

        public PermisoController(PermisoService permisoService)
        {
            _permisoService = permisoService;
        }

        // GET: api/Permiso
        [HttpGet]
        public IActionResult GetPermisos()
        {
            var permisos = _permisoService.GetAllPermisos();
            return Ok(permisos);
        }

        // GET: api/Permiso/5
        [HttpGet("{PER_id}")]
        public IActionResult GetPermiso(int PER_id)
        {
            var permiso = _permisoService.GetPermisoById(PER_id);
            if (permiso == null)
            {
                return NotFound();
            }
            return Ok(permiso);
        }

        // POST: api/Permiso
        [HttpPost]
        public IActionResult AddPermiso([FromBody] Permiso permiso)
        {
            if (permiso == null)
            {
                return BadRequest();
            }

            try
            {
                _permisoService.AddPermiso(permiso);
                return CreatedAtAction(nameof(GetPermiso), new { permiso.PER_id }, permiso);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Permiso/5
        [HttpPut("{PER_id}")]
        public IActionResult UpdatePermiso(int PER_id, [FromBody] Permiso permiso)
        {
            if (permiso == null)
            {
                return BadRequest();
            }

            var existingPermiso = _permisoService.GetPermisoById(PER_id);
            if (existingPermiso == null)
            {
                return NotFound();
            }

            _permisoService.UpdatePermiso(permiso);
            return NoContent();
        }

        // DELETE: api/Permiso/5
        [HttpDelete("{PER_id}")]
        public IActionResult DeletePermiso(int PER_id)
        {
            var permiso = _permisoService.GetPermisoById(PER_id);
            if (permiso == null)
            {
                return NotFound();
            }

            _permisoService.DeletePermiso(PER_id);
            return NoContent();
        }
    }
}
