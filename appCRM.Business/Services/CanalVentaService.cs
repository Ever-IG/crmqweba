using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class CanalVentaService
    {
        private readonly AppCRMContext _context;

        public CanalVentaService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<CanalVenta> GetAllCanalesVenta()
        {
            return _context.CanalesVenta.ToList();
        }

        public CanalVenta? GetCanalVentaById(int CVE_id) // Cambia el tipo de retorno a CanalVenta?
        {
            return _context.CanalesVenta.Find(CVE_id);
        }

        public void AddCanalVenta(CanalVenta canalVenta)
        {
            if (canalVenta == null)
            {
                throw new ArgumentNullException(nameof(canalVenta));
            }
            _context.CanalesVenta.Add(canalVenta);
            _context.SaveChanges();
        }

        public void UpdateCanalVenta(CanalVenta canalVenta)
        {
        var existingCanalVenta = _context.CanalesVenta.Find(canalVenta.CVE_id);
    
        if (existingCanalVenta != null)
        {
        existingCanalVenta.CVE_nombre = canalVenta.CVE_nombre;
        existingCanalVenta.CVE_descripcion = canalVenta.CVE_descripcion;
        existingCanalVenta.CVE_estado = canalVenta.CVE_estado;
        
        _context.SaveChanges();  
        }
        }

        public void DeleteCanalVenta(int CVE_id)
        {
            var canalVenta = _context.CanalesVenta.Find(CVE_id);
            if (canalVenta != null)
            {
                _context.CanalesVenta.Remove(canalVenta);
                _context.SaveChanges();
            }
        }
    }
}
