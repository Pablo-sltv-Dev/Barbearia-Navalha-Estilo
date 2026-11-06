var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte a Controllers (APIs)
builder.Services.AddControllers();

var app = builder.Build();

// Habilita o servidor a ler os arquivos da pasta wwwroot
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseRouting();
app.MapControllers();

app.Run();