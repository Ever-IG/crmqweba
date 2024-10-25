using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class PosibleClienteService
    {
        private readonly AppCRMContext _context;

        public PosibleClienteService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<PosibleCliente> GetAllPosiblesClientes()
        {
            return _context.PosiblesClientes.ToList();
        }

        public PosibleCliente? GetPosibleClienteById(int POC_id)
        {
            return _context.PosiblesClientes.Find(POC_id);
        }

        public void AddPosibleCliente(PosibleCliente posibleCliente)
        {
            if (posibleCliente == null)
            {
                throw new ArgumentNullException(nameof(posibleCliente));
            }
            _context.PosiblesClientes.Add(posibleCliente);
            _context.SaveChanges();
        }

        public void UpdatePosibleCliente(PosibleCliente posibleCliente)
        {
            var existingPosibleCliente = _context.PosiblesClientes.Find(posibleCliente.POC_id);

            if (existingPosibleCliente != null)
            {
                existingPosibleCliente.POC_nombre = posibleCliente.POC_nombre;
                existingPosibleCliente.POC_apellido = posibleCliente.POC_apellido;
                existingPosibleCliente.POC_empresa = posibleCliente.POC_empresa;
                existingPosibleCliente.POC_nit = posibleCliente.POC_nit;
                existingPosibleCliente.POC_dpi = posibleCliente.POC_dpi;
                existingPosibleCliente.POC_correo_electronico = posibleCliente.POC_correo_electronico;
                existingPosibleCliente.POC_telefono = posibleCliente.POC_telefono;
                existingPosibleCliente.POC_fuente_de_posible_cliente = posibleCliente.POC_fuente_de_posible_cliente;
                existingPosibleCliente.POC_estado_de_posible_cliente = posibleCliente.POC_estado_de_posible_cliente;
                existingPosibleCliente.POC_correo_electronico_secundario = posibleCliente.POC_correo_electronico_secundario;
                existingPosibleCliente.POC_telefono_secundario = posibleCliente.POC_telefono_secundario;
                existingPosibleCliente.POC_direccion = posibleCliente.POC_direccion;
                existingPosibleCliente.POC_departamento = posibleCliente.POC_departamento;
                existingPosibleCliente.POC_municipio = posibleCliente.POC_municipio;
                existingPosibleCliente.POC_codigo_postal = posibleCliente.POC_codigo_postal;
                existingPosibleCliente.POC_pais = posibleCliente.POC_pais;
                existingPosibleCliente.POC_imagenurl = posibleCliente.POC_imagenurl;
                existingPosibleCliente.CVE_id = posibleCliente.CVE_id;
                existingPosibleCliente.USU_id = posibleCliente.USU_id;

                _context.SaveChanges();
            }
        }

        public void DeletePosibleCliente(int POC_id)
        {
            var posibleCliente = _context.PosiblesClientes.Find(POC_id);
            if (posibleCliente != null)
            {
                _context.PosiblesClientes.Remove(posibleCliente);
                _context.SaveChanges();
            }
        }
    }
}
