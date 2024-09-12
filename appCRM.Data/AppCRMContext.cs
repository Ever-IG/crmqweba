using Microsoft.EntityFrameworkCore;
using appCRM.Data.Entities;

namespace appCRM.Data
{
    public class AppCRMContext : DbContext
    {
        public AppCRMContext(DbContextOptions<AppCRMContext> options) : base(options) {}

        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<CanalVenta> CanalesVenta { get; set; }
        public DbSet<PosibleCliente> PosiblesClientes { get; set; }
        public DbSet<Queja> Quejas { get; set; }
        public DbSet<Servicio> Servicios { get; set; }
        public DbSet<Proveedor> Proveedores { get; set; } // Agregado aquí

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<CanalVenta>()
                .ToTable("CRM_CANAL_VENTA")
                .HasKey(v => v.CVE_id);

            modelBuilder.Entity<PosibleCliente>()
                .ToTable("CRM_POSIBLE_CLIENTE")
                .HasKey(p => p.POC_id);

            modelBuilder.Entity<Queja>()
                .ToTable("CRM_QUEJA") 
                .HasKey(q => q.QUE_id); 

            modelBuilder.Entity<Servicio>()
                .ToTable("CRM_SERVICIO") 
                .HasKey(s => s.SER_id); 

            modelBuilder.Entity<Proveedor>()
                .ToTable("CRM_PROVEEDOR") // Mapea la tabla en la base de datos
                .HasKey(p => p.PRO_id); // Define la clave primaria

            modelBuilder.Entity<Cliente>()
                .ToTable("CRM_CLIENTE")
                .HasKey(c => c.CLI_id);

        }
    }
}
