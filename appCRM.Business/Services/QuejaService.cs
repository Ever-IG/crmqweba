using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class QuejaService
    {
        
        private readonly AppCRMContext _context;

        public QuejaService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Queja> GetAllQuejas()
        {
            return _context.Quejas.ToList();
        }

        public Queja? GetQuejaById(int QUE_id)
        {
            return _context.Quejas.Find(QUE_id);
        }

        public void AddQueja(Queja queja)
        {
            if (queja == null)
            {
                throw new ArgumentNullException(nameof(queja));
            }
            _context.Quejas.Add(queja);
            _context.SaveChanges();
        }

        public void UpdateQueja(Queja queja)
        {
            var existingQueja = _context.Quejas.Find(queja.QUE_id);
            if (existingQueja != null)
            {
                existingQueja.QUE_persona_id = queja.QUE_persona_id;
                existingQueja.QUE_tipo_persona = queja.QUE_tipo_persona;
                existingQueja.USU_id = queja.USU_id;
                existingQueja.QUE_fecha_queja = queja.QUE_fecha_queja;
                existingQueja.QUE_motivo = queja.QUE_motivo;
                existingQueja.QUE_estado = queja.QUE_estado;
                existingQueja.QUE_comentario = queja.QUE_comentario;

                _context.SaveChanges();
            }
        }

        public void DeleteQueja(int QUE_id)
        {
            var queja = _context.Quejas.Find(QUE_id);
            if (queja != null)
            {
                _context.Quejas.Remove(queja);
                _context.SaveChanges();
            }
        }

    }
}