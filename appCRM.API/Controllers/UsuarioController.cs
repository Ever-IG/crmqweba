using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _usuarioService;

        public UsuarioController(UsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        // GET: api/Usuario
        [HttpGet]
        public IActionResult GetUsuarios()
        {
            var usuarios = _usuarioService.GetAllUsuarios();
            return Ok(usuarios);
        }

        // GET: api/Usuario/5
        [HttpGet("{USU_id}")]
        public IActionResult GetUsuario(int USU_id)
        {
            var usuario = _usuarioService.GetUsuarioById(USU_id);
            if (usuario == null)
            {
                return NotFound();
            }
            return Ok(usuario);
        }

        // POST: api/Usuario
        [HttpPost]
        public IActionResult AddUsuario([FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            try
            {
                _usuarioService.AddUsuario(usuario);
                return CreatedAtAction(nameof(GetUsuario), new { USU_id = usuario.USU_id }, usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT: api/Usuario/5
        [HttpPut("{USU_id}")]
        public IActionResult UpdateUsuario(int USU_id, [FromBody] Usuario usuario)
        {
            if (usuario == null)
            {
                return BadRequest();
            }

            var existingUsuario = _usuarioService.GetUsuarioById(USU_id);
            if (existingUsuario == null)
            {
                return NotFound();
            }

         //   usuario.USU_id = USU_id; // Asegúrate de que el ID se mantenga
            _usuarioService.UpdateUsuario(usuario);
            return NoContent();
        }

        // DELETE: api/Usuario/5
        [HttpDelete("{USU_id}")]
        public IActionResult DeleteUsuario(int USU_id)
        {
            var usuario = _usuarioService.GetUsuarioById(USU_id);
            if (usuario == null)
            {
                return NotFound();
            }

            _usuarioService.DeleteUsuario(USU_id);
            return NoContent();
        }
    }
}
