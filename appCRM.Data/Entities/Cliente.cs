namespace appCRM.Data.Entities
{
    public class Cliente
    {
        public int CLI_id { get; set; } // ID de la entidad, clave primaria
        public string CLI_nombre { get; set; } // Nombre del cliente
        public string CLI_apellido { get; set; } // Apellido del cliente
        public string CLI_empresa { get; set; } // Empresa del cliente
        public string CLI_nit { get; set; } // NIT del cliente
        public string CLI_dpi { get; set; } // DPI del cliente
        public string CLI_correo_electronico { get; set; } // Correo electrónico del cliente
        public string CLI_telefono { get; set; } // Teléfono del cliente
        public string CLI_correo_electronico_secundario { get; set; } // Correo electrónico secundario
        public string CLI_telefono_secundario { get; set; } // Teléfono secundario
        public string CLI_direccion { get; set; } // Dirección del cliente
        public string CLI_departamento { get; set; } // Departamento del cliente
        public string CLI_municipio { get; set; } // Municipio del cliente
        public string CLI_codigo_postal { get; set; } // Código postal del cliente
        public string CLI_pais { get; set; } // País del cliente
        public string CLI_imagenurl { get; set; } // URL de la imagen del cliente
        public int CVE_id { get; set; } // Clave foránea a CanalVenta
    
    
    }
}