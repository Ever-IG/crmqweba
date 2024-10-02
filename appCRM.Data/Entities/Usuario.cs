namespace appCRM.Data.Entities
{
    public class Usuario
    {
        public int USU_id { get; set; } // ID del usuario, clave primaria
        public string USU_nombre { get; set; } // Nombre del usuario
        public string USU_correo_electronico { get; set; } // Correo electrónico del usuario
        public int ROL_id { get; set; } // Clave foránea al rol del usuario
    }
}
