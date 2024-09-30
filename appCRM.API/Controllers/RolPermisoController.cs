using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RolPermisoController : ControllerBase
    {
        private readonly RolPermisoService _rolPermisoService;

        public RolPermisoController(RolPermisoService rolPermisoService)
        {
            _rolPermisoService = rolPermisoService;
        }

        // GET: api/RolPermiso
        [HttpGet]
        public IActionResult GetRolPermisos()
        {
            var rolPermisos = _rolPermisoService.GetAllRolPermisos();
            return Ok(rolPermisos);
        }

        // GET: api/RolPermiso/5/5
        [HttpGet("{ROL_id}/{PER_id}")]
        public IActionResult GetRolPermiso(int ROL_id, int PER_id)
        {
            var rolPermiso = _rolPermisoService.GetRolPermisoByIds(ROL_id, PER_id);
            if (rolPermiso == null)
            {
                return NotFound();
            }
            return Ok(rolPermiso);
        }

        // POST: api/RolPermiso
        [HttpPost]
        public IActionResult AddRolPermiso([FromBody] RolPermiso rolPermiso)
        {
            if (rolPermiso == null)
            {
                return BadRequest();
            }

            try
            {
                _rolPermisoService.AddRolPermiso(rolPermiso);
                return CreatedAtAction(nameof(GetRolPermiso), new { rolPermiso.ROL_id, rolPermiso.PER_id }, rolPermiso);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }




        // DELETE: api/RolPermiso/5/5
        [HttpDelete("{ROL_id}/{PER_id}")]
        public IActionResult DeleteRolPermiso(int ROL_id, int PER_id)
        {
            var rolPermiso = _rolPermisoService.GetRolPermisoByIds(ROL_id, PER_id);
            if (rolPermiso == null)
            {
                return NotFound();
            }

            _rolPermisoService.DeleteRolPermiso(ROL_id, PER_id);
            return NoContent();
        }
    }
}
