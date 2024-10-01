using appCRM.Data;
using appCRM.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace appCRM.Business.Services
{
    public class SeguimientoService
    {
        private readonly AppCRMContext _context;

        public SeguimientoService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Seguimiento> GetAllSeguimientos()
        {
            return _context.Seguimientos.ToList();
        }

        public Seguimiento? GetSeguimientoById(int segId)
        {
            return _context.Seguimientos.Find(segId);
        }

        public void AddSeguimiento(Seguimiento seguimiento)
        {
            if (seguimiento == null || !seguimiento.EsValido())
            {
                throw new ArgumentException("Debe proporcionar un Cliente o un Posible Cliente, pero no ambos.");
            }

            _context.Seguimientos.Add(seguimiento);
            _context.SaveChanges();
        }

        public void UpdateSeguimiento(Seguimiento seguimiento)
        {
            if (seguimiento == null || !seguimiento.EsValido())
            {
                throw new ArgumentException("Debe proporcionar un Cliente o un Posible Cliente, pero no ambos.");
            }

            var existingSeguimiento = _context.Seguimientos.Find(seguimiento.SEG_id);
            if (existingSeguimiento != null)
            {
                existingSeguimiento.USU_id = seguimiento.USU_id;
                existingSeguimiento.CLI_id = seguimiento.CLI_id;
                existingSeguimiento.POC_id = seguimiento.POC_id;
                existingSeguimiento.SEG_tipo_seguimiento = seguimiento.SEG_tipo_seguimiento;
                existingSeguimiento.SEG_fecha_seguimiento = seguimiento.SEG_fecha_seguimiento;
                existingSeguimiento.SEG_asunto = seguimiento.SEG_asunto;
                existingSeguimiento.SEG_proposito_llamada = seguimiento.SEG_proposito_llamada;
                existingSeguimiento.SEG_resultado = seguimiento.SEG_resultado;
                existingSeguimiento.SEG_comentario = seguimiento.SEG_comentario;

                _context.Entry(existingSeguimiento).State = EntityState.Modified;
                _context.SaveChanges();
            }
            else
            {
                throw new KeyNotFoundException($"No se encontró un seguimiento con ID {seguimiento.SEG_id}.");
            }
        }

        public void DeleteSeguimiento(int segId)
        {
            var seguimiento = _context.Seguimientos.Find(segId);
            if (seguimiento != null)
            {
                _context.Seguimientos.Remove(seguimiento);
                _context.SaveChanges();
            }
        }
    }
}
