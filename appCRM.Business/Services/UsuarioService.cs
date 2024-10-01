using appCRM.Data;
using appCRM.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace appCRM.Business.Services
{
    public class UsuarioService
    {
        private readonly AppCRMContext _context;

        public UsuarioService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Usuario> GetAllUsuarios()
        {
            return _context.Usuarios.ToList();
        }

        public Usuario? GetUsuarioById(int USU_id)
        {
            return _context.Usuarios.Find(USU_id);
        }

        public void AddUsuario(Usuario usuario)
        {
            if (usuario == null)
            {
                throw new ArgumentNullException(nameof(usuario));
            }
            _context.Usuarios.Add(usuario);
            _context.SaveChanges();
        }

        
    public void UpdateUsuario(Usuario usuario)
        {
            var existingUsuario = _context.Usuarios.Find(usuario.USU_id);
            if (existingUsuario != null)
            {
                existingUsuario.USU_nombre = usuario.USU_nombre;
                existingUsuario.USU_correo_electronico = usuario.USU_correo_electronico;
                existingUsuario.ROL_id = usuario.ROL_id;

                _context.SaveChanges();
            }
        }



        public void DeleteUsuario(int USU_id)
        {
            var usuario = _context.Usuarios.Find(USU_id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
                _context.SaveChanges();
            }
        }
    }
}
