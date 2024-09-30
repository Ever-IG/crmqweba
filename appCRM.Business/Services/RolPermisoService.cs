using appCRM.Data;
using appCRM.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace appCRM.Business.Services
{
    public class RolPermisoService
    {
        private readonly AppCRMContext _context;

        public RolPermisoService(AppCRMContext context)
        {
            _context = context;
        }

        // Obtener todos los registros de RolPermiso
        public IEnumerable<RolPermiso> GetAllRolPermisos()
        {
            return _context.RolPermisos.ToList();
        }

        // Obtener un RolPermiso específico por sus IDs
        public RolPermiso? GetRolPermisoByIds(int ROL_id, int PER_id)
        {
            return _context.RolPermisos.Find(ROL_id, PER_id);
        }

        // Agregar un nuevo RolPermiso
        public void AddRolPermiso(RolPermiso rolPermiso)
        {
            if (rolPermiso == null)
            {
                throw new ArgumentNullException(nameof(rolPermiso));
            }
            _context.RolPermisos.Add(rolPermiso);
            _context.SaveChanges();
        }

        // Eliminar un RolPermiso por sus IDs
        public void DeleteRolPermiso(int ROL_id, int PER_id)
        {
            var rolPermiso = _context.RolPermisos.Find(ROL_id, PER_id);
            if (rolPermiso != null)
            {
                _context.RolPermisos.Remove(rolPermiso);
                _context.SaveChanges();
            }
        }
    }
}
