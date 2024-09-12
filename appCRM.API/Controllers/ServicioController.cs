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
    public class ServicioController : ControllerBase
    {
        private readonly ServicioService _servicioService;

        public ServicioController(ServicioService servicioService)
        {
            _servicioService = servicioService;
        }

        // GET: api/Servicio
        [HttpGet]
        public IActionResult GetServicios()
        {
            var servicios = _servicioService.GetAllServicios();
            return Ok(servicios);
        }

        // GET: api/Servicio/5
        [HttpGet("{SER_id}")]
        public IActionResult GetServicio(int SER_id)
        {
            var servicio = _servicioService.GetServicioById(SER_id);
            if (servicio == null)
            {
                return NotFound();
            }
            return Ok(servicio);
        }

        // POST: api/Servicio
        [HttpPost]
        public IActionResult AddServicio([FromBody] Servicio servicio)
        {
            if (servicio == null)
            {
                return BadRequest();
            }

            _servicioService.AddServicio(servicio);
            return CreatedAtAction(nameof(GetServicio), new { SER_id = servicio.SER_id }, servicio);
        }

        // PUT: api/Servicio/5
        [HttpPut("{SER_id}")]
public IActionResult UpdateServicio(int SER_id, [FromBody] Servicio servicio)
{
    // No es necesario validar el servicio.SER_id con el ID de la URL
    if (servicio == null)
    {
        return BadRequest("El servicio no puede ser nulo.");
    }

    var existingServicio = _servicioService.GetServicioById(SER_id);
    if (existingServicio == null)
    {
        return NotFound();
    }

    // Actualizar los campos sin usar el SER_id del cuerpo
    existingServicio.SER_nombre = servicio.SER_nombre;
    existingServicio.SER_descripcion = servicio.SER_descripcion;
    existingServicio.SER_precio = servicio.SER_precio;

    _servicioService.UpdateServicio(existingServicio);

    return NoContent();
}


        // DELETE: api/Servicio/5
        [HttpDelete("{SER_id}")]
        public IActionResult DeleteServicio(int SER_id)
        {
            var servicio = _servicioService.GetServicioById(SER_id);
            if (servicio == null)
            {
                return NotFound();
            }

            _servicioService.DeleteServicio(SER_id);
            return NoContent();
        }
    }
}