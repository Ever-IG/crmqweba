using System;
using System.Collections.Generic;
using System.Linq;
using appCRM.Data;
using appCRM.Data.Entities;

namespace appCRM.Business.Services
{
    public class ClienteService
    {
        private readonly AppCRMContext _context;

        public ClienteService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Cliente> GetAllClientes()
        {
            return _context.Clientes.ToList();
        }

        public Cliente? GetClienteById(int CLI_id)
        {
            return _context.Clientes.Find(CLI_id);
        }

        public void AddCliente(Cliente cliente)
        {
            if (cliente == null)
            {
                throw new ArgumentNullException(nameof(cliente));
            }
            _context.Clientes.Add(cliente);
            _context.SaveChanges();
        }

        public void UpdateCliente(Cliente cliente)
        {
            var existingCliente = _context.Clientes.Find(cliente.CLI_id);
            if (existingCliente != null)
            {
                existingCliente.CLI_nombre = cliente.CLI_nombre;
                existingCliente.CLI_apellido = cliente.CLI_apellido;
                existingCliente.CLI_empresa = cliente.CLI_empresa;
                existingCliente.CLI_nit = cliente.CLI_nit;
                existingCliente.CLI_dpi = cliente.CLI_dpi;
                existingCliente.CLI_correo_electronico = cliente.CLI_correo_electronico;
                existingCliente.CLI_telefono = cliente.CLI_telefono;
                existingCliente.CLI_correo_electronico_secundario = cliente.CLI_correo_electronico_secundario;
                existingCliente.CLI_telefono_secundario = cliente.CLI_telefono_secundario;
                existingCliente.CLI_direccion = cliente.CLI_direccion;
                existingCliente.CLI_departamento = cliente.CLI_departamento;
                existingCliente.CLI_municipio = cliente.CLI_municipio;
                existingCliente.CLI_codigo_postal = cliente.CLI_codigo_postal;
                existingCliente.CLI_pais = cliente.CLI_pais;
                existingCliente.CLI_imagenurl = cliente.CLI_imagenurl;
                existingCliente.CVE_id = cliente.CVE_id;

                _context.SaveChanges();
            }
        }

        public void DeleteCliente(int CLI_id)
        {
            var cliente = _context.Clientes.Find(CLI_id);
            if (cliente != null)
            {
                _context.Clientes.Remove(cliente);
                _context.SaveChanges();
            }
        }
    }
}
