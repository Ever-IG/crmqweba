using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class ServicioService
    {
        private readonly AppCRMContext _context;

        public ServicioService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Servicio> GetAllServicios()
        {
            return _context.Servicios.ToList();
        }

        public Servicio? GetServicioById(int SER_id)
        {
            return _context.Servicios.Find(SER_id);
        }

        public void AddServicio(Servicio servicio)
        {
            if (servicio == null)
            {
                throw new ArgumentNullException(nameof(servicio));
            }
            _context.Servicios.Add(servicio);
            _context.SaveChanges();
        }

        public void UpdateServicio(Servicio servicio)
        {
            var existingServicio = _context.Servicios.Find(servicio.SER_id);
            if (existingServicio != null)
            {
                existingServicio.SER_nombre = servicio.SER_nombre;
                existingServicio.SER_descripcion = servicio.SER_descripcion;
                existingServicio.SER_precio = servicio.SER_precio;

                _context.SaveChanges();
            }
        }

        public void DeleteServicio(int SER_id)
        {
            var servicio = _context.Servicios.Find(SER_id);
            if (servicio != null)
            {
                _context.Servicios.Remove(servicio);
                _context.SaveChanges();
            }
        }
    }
}
