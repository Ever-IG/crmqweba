using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class RolService
    {
        private readonly AppCRMContext _context;

        public RolService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Rol> GetAllRoles()
        {
            return _context.Roles.ToList();
        }

        public Rol? GetRolById(int ROL_id)
        {
            return _context.Roles.Find(ROL_id);
        }

        public void AddRol(Rol rol)
        {
            if (rol == null)
            {
                throw new ArgumentNullException(nameof(rol));
            }
            _context.Roles.Add(rol);
            _context.SaveChanges();
        }

        public void UpdateRol(Rol rol)
        {
            var existingRol = _context.Roles.Find(rol.ROL_id);
            if (existingRol != null)
            {
                existingRol.ROL_nombre = rol.ROL_nombre;
                _context.SaveChanges();
            }
        }

        public void DeleteRol(int ROL_id)
        {
            var rol = _context.Roles.Find(ROL_id);
            if (rol != null)
            {
                _context.Roles.Remove(rol);
                _context.SaveChanges();
            }
        }
    }
}
