using Microsoft.AspNetCore.Mvc;
using appCRM.Business.Services;
using appCRM.Data.Entities;

namespace appCRM.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClienteController : ControllerBase
    {
        private readonly ClienteService _clienteService;

        public ClienteController(ClienteService clienteService)
        {
            _clienteService = clienteService;
        }

        // GET: api/Cliente
        [HttpGet]
        public IActionResult GetClientes()
        {
            var clientes = _clienteService.GetAllClientes();
            return Ok(clientes);
        }

        // GET: api/Cliente/5
        [HttpGet("{CLI_id}")]
        public IActionResult GetCliente(int CLI_id)
        {
            var cliente = _clienteService.GetClienteById(CLI_id);
            if (cliente == null)
            {
                return NotFound();
            }
            return Ok(cliente);
        }

        // POST: api/Cliente
        [HttpPost]
    public IActionResult AddCliente([FromBody] Cliente cliente)
    {
        if (cliente == null)
        {
            return BadRequest();
        }

        try
        {
            _clienteService.AddCliente(cliente);
            return CreatedAtAction(nameof(GetCliente), new { cliente.CLI_id }, cliente);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

        // PUT: api/Cliente/5
        [HttpPut("{CLI_id}")]
        public IActionResult UpdateCliente(int CLI_id, [FromBody] Cliente cliente)
        {
            if (cliente == null)
            {
                return BadRequest();
            }

            var existingCliente = _clienteService.GetClienteById(CLI_id);
            if (existingCliente == null)
            {
                return NotFound();
            }

            _clienteService.UpdateCliente(cliente);
            return NoContent();
        }

        // DELETE: api/Cliente/5
        [HttpDelete("{CLI_id}")]
        public IActionResult DeleteCliente(int CLI_id)
        {
            var cliente = _clienteService.GetClienteById(CLI_id);
            if (cliente == null)
            {
                return NotFound();
            }

            _clienteService.DeleteCliente(CLI_id);
            return NoContent();
        }
    }
}
