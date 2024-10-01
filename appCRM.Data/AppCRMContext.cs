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
        public DbSet<Proveedor> Proveedores { get; set; }
        public DbSet<CierreTrato> CierresTrato { get; set; }
        public DbSet<Cotizacion> Cotizaciones { get; set; }
        public DbSet<Permiso> Permisos { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<RolPermiso> RolPermisos { get; set; } 
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Seguimiento> Seguimientos { get; set; } 
         public DbSet<DetalleCierreTrato> DetalleCierreTratos { get; set; } 
      public DbSet<DetalleCotizacion> DetalleCotizaciones { get; set; } 


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
                .ToTable("CRM_PROVEEDOR")
                .HasKey(p => p.PRO_id);

            modelBuilder.Entity<Cliente>()
                .ToTable("CRM_CLIENTE")
                .HasKey(c => c.CLI_id);

            modelBuilder.Entity<CierreTrato>()
                .ToTable("CRM_CIERRE_TRATO")
                .HasKey(ci => ci.CIE_id);

            modelBuilder.Entity<Cotizacion>()
                .ToTable("CRM_COTIZACION")
                .HasKey(c => c.COT_id);

            modelBuilder.Entity<Permiso>()
                .ToTable("CRM_PERMISO")
                .HasKey(p => p.PER_id);

            modelBuilder.Entity<Rol>()
                .ToTable("CRM_ROL")
                .HasKey(r => r.ROL_id);

            modelBuilder.Entity<RolPermiso>() 
                .ToTable("CRM_ROL_PERMISO")
                .HasKey(rp => new { rp.ROL_id, rp.PER_id });

            modelBuilder.Entity<Usuario>()
                .ToTable("CRM_USUARIO")
                .HasKey(u => u.USU_id);

            modelBuilder.Entity<Seguimiento>()
                .ToTable("CRM_SEGUIMIENTO")
                .HasKey(s => s.SEG_id);

            modelBuilder.Entity<DetalleCierreTrato>()
               .ToTable("CRM_DETALLE_CIERRE_TRATO")
               .HasKey(d => d.DEC_id);

            modelBuilder.Entity<DetalleCotizacion>()
                .ToTable("CRM_DETALLE_COTIZACION")
               .HasKey(d => d.DET_id);

        }
    }
}
