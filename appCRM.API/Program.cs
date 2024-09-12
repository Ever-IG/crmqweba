using appCRM.Data;
using Microsoft.EntityFrameworkCore;
using appCRM.Business.Services;

var builder = WebApplication.CreateBuilder(args);

// Definir una política de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Configurar servicios
builder.Services.AddDbContext<AppCRMContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), 
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddScoped<ClienteService>();
builder.Services.AddScoped<CanalVentaService>(); // Agregar el servicio para CanalVenta
builder.Services.AddScoped<PosibleClienteService>(); 
builder.Services.AddScoped<ProveedorService>(); // Agregar el servicio para Proveedor
builder.Services.AddScoped<QuejaService>(); // Agregar el servicio para Queja
builder.Services.AddScoped<ServicioService>(); //Agregar el servicio para Servicio

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Usar la política de CORS definida
app.UseCors("AllowAll");

// Configurar middlewares
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "appCRM.API v1"));
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
