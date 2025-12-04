# ProjetoGigiDede --- ASP.NET Core MVC + MySQL

- Débora Lopes de Souza
- Giovanna Soares do Nascimento

## Visão Geral

Projeto ASP.NET Core MVC voltado para cadastro de usuários com validação
de formulário, integração com MySQL utilizando SQL puro e uma
arquitetura leve e organizada. Este documento segue o padrão *Enterprise
GitHub* com seções claras, detalhadas e objetivas.

------------------------------------------------------------------------

## Arquitetura do Sistema

-   **ASP.NET Core 8 MVC**
-   **MySQL** (MySqlConnector)
-   **Entity Framework Core (mapeamento básico)**
-   **C# + Razor Views**
-   **Validação via DataAnnotations**

Estrutura geral:

ProjetoGigiDede/
├── .gitignore
├── README.md
├── ProjetoGigiDede.sln

├── src/
│   └── ProjetoGigiDede/
│       ├── wwwroot/
│       │   ├── css/
│       │   ├── js/
│       │   └── lib/

│       ├── Controllers/
│       │   ├── HomeController.cs
│       │   └── UsuarioController.cs

│       ├── Data/
│       │   └── AppDbContext.cs

│       ├── Migrations/
│       │   ├── 20251204034833_initDB.cs
│       │   └── AppDbContextModelSnapshot.cs

│       ├── Models/
│       │   └── Usuario.cs

│       ├── Views/
│       │   ├── Home/
│       │   │   ├── Cadastro.cshtml
│       │   │   ├── Index.cshtml
│       │   │   └── Login.cshtml
│       │   ├── Usuario/
│       │   │   ├── Create.cshtml
│       │   │   ├── Edit.cshtml
│       │   │   ├── List.cshtml
│       │   │   └── Details.cshtml
│       │   └── Shared/
│       │       ├── _Layout.cshtml
│       │       ├── _ValidationScriptsPartial.cshtml
│       │       └── _ViewImports.cshtml

│       ├── GlobalUsing.cs
│       ├── Program.cs
│       └── appsettings.json

└── tests/
    └── ProjetoGigiDede.Tests/
        ├── UsuarioTests.cs
        └── HomeControllerTests.cs

------------------------------------------------------------------------

## Configuração do Projeto

### Requisitos

-   .NET SDK 8+
-   MySQL Server 8+
-   Visual Studio ou VS Code

### Configurar Connection String

No arquivo `appsettings.json`:

``` json
"ConnectionStrings": { 
  "MySqlConn": "Server=localhost;Database=dbrotisseria;User=root;Password=12345678;"
}
```

### Criar Banco e Tabela

``` sql
CREATE DATABASE dbrotisseria;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    senha VARCHAR(255) NOT NULL
);
```

------------------------------------------------------------------------

# Camada de Dados

## AppDbContext

Classe responsável por registrar a entidade `Usuario` no EF Core:

``` csharp
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

    public DbSet<Usuario> Usuarios { get; set; }
}
```

------------------------------------------------------------------------

# Model: Usuario

Contém validações completas via DataAnnotations:

``` csharp
public class Usuario
{
    [Key]
    public int? id { get; set; }

    [Required]
    public string? nome { get; set; }

    [Required, EmailAddress]
    public string? email { get; set; }

    [Required, MinLength(6)]
    public string? senha { get; set; }

    [NotMapped]
    [Compare("senha")]
    public string? ConfirmPassword { get; set; }
}
```

**Destaques da Model**\
- Validações embutidas no servidor\
- Campo `ConfirmPassword` não mapeado (somente para o formulário)\
- Email validado automaticamente pelo atributo `EmailAddress`

------------------------------------------------------------------------

# Controller: UsuarioController

### Funções:

-   Renderiza formulário de cadastro\
-   Valida model\
-   Envia usuário ao MySQL usando SQL puro\
-   Retorna `OK()` para integração com Javascript (via Fetch API)

Trecho principal:

``` csharp
[HttpPost]
[ValidateAntiForgeryToken]
public async Task<IActionResult> Cadastro(Usuario newUsuario)
{
    if (!ModelState.IsValid)
        return View(newUsuario);

    using (var conn = new MySqlConnection(_connectionString))
    {
        await conn.OpenAsync();
        string sql = "INSERT INTO usuarios (nome, email, senha) VALUES (@nome, @email, @senha)";
        using (var cmd = new MySqlCommand(sql, conn))
        {
            cmd.Parameters.AddWithValue("@nome", newUsuario.nome);
            cmd.Parameters.AddWithValue("@email", newUsuario.email);
            cmd.Parameters.AddWithValue("@senha", newUsuario.senha);
            await cmd.ExecuteNonQueryAsync();
        }
    }

    TempData["Mensagem"] = "Cadastro realizado com sucesso!";
    return Ok();
}
```

------------------------------------------------------------------------

# Rotas Implementadas

  Método   Rota                  Ação                Descrição
  -------- --------------------- ------------------- --------------------
  GET      `/Usuario/Cadastro`   Cadastro()          Exibe o formulário
  POST     `/Usuario/Cadastro`   Cadastro(Usuario)   Salva no MySQL

------------------------------------------------------------------------

# Licença

Projeto interno educacional. Nenhuma licença pública definida.

------------------------------------------------------------------------
