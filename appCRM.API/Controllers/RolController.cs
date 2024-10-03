using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolController : ControllerBase
    {
        private readonly RolService _rolService;

        public RolController(RolService rolService)
        {
            _rolService = rolService;
        }

        // GET: api/Rol
        [HttpGet]
        public IActionResult GetRoles()
        {
            var roles = _rolService.GetAllRoles();
            return Ok(roles);
        }

        // GET: api/Rol/5
        [HttpGet("{ROL_id}")]
        public IActionResult GetRol(int ROL_id)
        {
            var rol = _rolService.GetRolById(ROL_id);
            if (rol == null)
            {
                return NotFound();
            }
            return Ok(rol);
        }

        // POST: api/Rol
        [HttpPost]
        public IActionResult AddRol([FromBody] Rol rol)
        {
            if (rol == null)
            {
                return BadRequest();
            }

            try
            {
                _rolService.AddRol(rol);
                return CreatedAtAction(nameof(GetRol), new { rol.ROL_id }, rol);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Rol/5
        [HttpPut("{ROL_id}")]
        public IActionResult UpdateRol(int ROL_id, [FromBody] Rol rol)
        {
            if (rol == null)
            {
                return BadRequest();
            }

            var existingRol = _rolService.GetRolById(ROL_id);
            if (existingRol == null)
            {
                return NotFound();
            }

            _rolService.UpdateRol(rol);
            return NoContent();
        }

        // DELETE: api/Rol/5
        [HttpDelete("{ROL_id}")]
        public IActionResult DeleteRol(int ROL_id)
        {
            var rol = _rolService.GetRolById(ROL_id);
            if (rol == null)
            {
                return NotFound();
            }

            _rolService.DeleteRol(ROL_id);
            return NoContent();
        }
    }
}
