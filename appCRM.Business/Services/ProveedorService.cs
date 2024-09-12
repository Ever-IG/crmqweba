using appCRM.Data;
using appCRM.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace appCRM.Business.Services
{
    public class ProveedorService
    {
        private readonly AppCRMContext _context;

        public ProveedorService(AppCRMContext context)
        {
            _context = context;
        }

        public IEnumerable<Proveedor> GetAllProveedores()
        {
            return _context.Proveedores.ToList();
        }

        public Proveedor? GetProveedorById(int PRO_id)
        {
            return _context.Proveedores.Find(PRO_id);
        }

        public void AddProveedor(Proveedor proveedor)
        {
            if (proveedor == null)
            {
                throw new ArgumentNullException(nameof(proveedor));
            }
            _context.Proveedores.Add(proveedor);
            _context.SaveChanges();
        }

        public void UpdateProveedor(Proveedor proveedor)
        {
            var existingProveedor = _context.Proveedores.Find(proveedor.PRO_id);
            if (existingProveedor != null)
            {
                existingProveedor.PRO_nombre = proveedor.PRO_nombre;
                existingProveedor.PRO_apellido = proveedor.PRO_apellido;
                existingProveedor.PRO_nombre_empresa = proveedor.PRO_nombre_empresa;
                existingProveedor.PRO_nit = proveedor.PRO_nit;
                existingProveedor.PRO_telefono = proveedor.PRO_telefono;
                existingProveedor.PRO_correo_electronico = proveedor.PRO_correo_electronico;
                existingProveedor.PRO_direccion = proveedor.PRO_direccion;
                existingProveedor.PRO_departamento = proveedor.PRO_departamento;
                existingProveedor.PRO_municipio = proveedor.PRO_municipio;
                existingProveedor.PRO_codigo_postal = proveedor.PRO_codigo_postal;
                existingProveedor.PRO_pais = proveedor.PRO_pais;

                _context.SaveChanges();
            }
        }

        public void DeleteProveedor(int PRO_id)
        {
            var proveedor = _context.Proveedores.Find(PRO_id);
            if (proveedor != null)
            {
                _context.Proveedores.Remove(proveedor);
                _context.SaveChanges();
            }
        }
    }
}
