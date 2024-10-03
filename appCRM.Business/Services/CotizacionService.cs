using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class CotizacionService
    {
        private readonly AppCRMContext _context;

        public CotizacionService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Cotizacion> GetAllCotizaciones()
        {
            return _context.Cotizaciones.ToList();
        }

        public Cotizacion? GetCotizacionById(int COT_id)
        {
            return _context.Cotizaciones.Find(COT_id);
        }

        public void AddCotizacion(Cotizacion cotizacion)
        {
            if (cotizacion == null)
            {
                throw new ArgumentNullException(nameof(cotizacion));
            }
            _context.Cotizaciones.Add(cotizacion);
            _context.SaveChanges();
        }

        public void UpdateCotizacion(Cotizacion cotizacion)
        {
            var existingCotizacion = _context.Cotizaciones.Find(cotizacion.COT_id);
    
            if (existingCotizacion != null)
            {
                existingCotizacion.COT_numero = cotizacion.COT_numero;
                existingCotizacion.COT_fecha_cotizacion = cotizacion.COT_fecha_cotizacion;
                existingCotizacion.COT_fecha_vencimiento = cotizacion.COT_fecha_vencimiento;
                existingCotizacion.USU_id = cotizacion.USU_id;
                existingCotizacion.clI_id = cotizacion.clI_id;
                existingCotizacion.COT_asunto = cotizacion.COT_asunto;
                existingCotizacion.COT_total = cotizacion.COT_total;
                existingCotizacion.COT_estado = cotizacion.COT_estado;

                _context.SaveChanges();  
            }
        }

        public void DeleteCotizacion(int COT_id)
        {
            var cotizacion = _context.Cotizaciones.Find(COT_id);
            if (cotizacion != null)
            {
                _context.Cotizaciones.Remove(cotizacion);
                _context.SaveChanges();
            }
        }
    }
}
