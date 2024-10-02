using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class CierreTratoService
    {
        private readonly AppCRMContext _context;

        public CierreTratoService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<CierreTrato> GetAllCierresTrato()
        {
            return _context.CierresTrato.ToList();
        }

        public CierreTrato? GetCierreTratoById(int CIE_id)
        {
            return _context.CierresTrato.Find(CIE_id);
        }

        public void AddCierreTrato(CierreTrato cierreTrato)
        {
            if (cierreTrato == null)
            {
                throw new ArgumentNullException(nameof(cierreTrato));
            }
            _context.CierresTrato.Add(cierreTrato);
            _context.SaveChanges();
        }

        public void UpdateCierreTrato(CierreTrato cierreTrato)
        {
            var existingCierreTrato = _context.CierresTrato.Find(cierreTrato.CIE_id);
    
            if (existingCierreTrato != null)
            {
                existingCierreTrato.CIE_numero = cierreTrato.CIE_numero;
                existingCierreTrato.CIE_fecha_venta = cierreTrato.CIE_fecha_venta;
                existingCierreTrato.CIE_fecha_vencimiento = cierreTrato.CIE_fecha_vencimiento;
                existingCierreTrato.CIE_estado = cierreTrato.CIE_estado;
                existingCierreTrato.USU_id = cierreTrato.USU_id;
                existingCierreTrato.CLI_id = cierreTrato.CLI_id;
                existingCierreTrato.CIE_asunto = cierreTrato.CIE_asunto;
                existingCierreTrato.CIE_total = cierreTrato.CIE_total;

                _context.SaveChanges();  
            }
        }

        public void DeleteCierreTrato(int CIE_id)
        {
            var cierreTrato = _context.CierresTrato.Find(CIE_id);
            if (cierreTrato != null)
            {
                _context.CierresTrato.Remove(cierreTrato);
                _context.SaveChanges();
            }
        }
    }
}
