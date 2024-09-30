using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class PermisoService
    {
        private readonly AppCRMContext _context;

        public PermisoService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Permiso> GetAllPermisos()
        {
            return _context.Permisos.ToList();
        }

        public Permiso? GetPermisoById(int PER_id)
        {
            return _context.Permisos.Find(PER_id);
        }

        public void AddPermiso(Permiso permiso)
        {
            if (permiso == null)
            {
                throw new ArgumentNullException(nameof(permiso));
            }
            _context.Permisos.Add(permiso);
            _context.SaveChanges();
        }

        public void UpdatePermiso(Permiso permiso)
        {
            var existingPermiso = _context.Permisos.Find(permiso.PER_id);
    
            if (existingPermiso != null)
            {
                existingPermiso.PER_nombre = permiso.PER_nombre;

                _context.SaveChanges();  
            }
        }

        public void DeletePermiso(int PER_id)
        {
            var permiso = _context.Permisos.Find(PER_id);
            if (permiso != null)
            {
                _context.Permisos.Remove(permiso);
                _context.SaveChanges();
            }
        }
    }
}
