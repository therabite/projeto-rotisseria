using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using ProjetoGigiDede.Models;
using System.Diagnostics;
    
namespace ProjetoGigiDede.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _connectionString;

        public UsuarioController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MySqlConn");
        }

        public IActionResult Cadastro()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Cadastro(Usuario newUsuario)
        {
            if (!ModelState.IsValid)
                return View(newUsuario);

            try
            {
                using (var conn = new MySqlConnection(_connectionString))
                {
                    await conn.OpenAsync();

                    string sql = "INSERT INTO usuarios (nome, email, senha) VALUES (@nome, @email, @senha)";
                    using (var cmd = new MySqlCommand(sql, conn))
                    {
                        cmd.Parameters.AddWithValue("@nome", newUsuario.nome ?? string.Empty);
                        cmd.Parameters.AddWithValue("@email", newUsuario.email ?? string.Empty);
                        cmd.Parameters.AddWithValue("@senha", newUsuario.senha ?? string.Empty); // ideal: salvar hash
                        await cmd.ExecuteNonQueryAsync();
                    }
                }

                TempData["Mensagem"] = "Cadastro realizado com sucesso!";
                // ao usar fetch no cliente, devolver uma resposta 200 permite tratar o sucesso no JS
                return Ok();
            }
            catch (Exception ex)
            {
                ModelState.AddModelError("", "Erro ao inserir: " + ex.Message);
                return BadRequest("Erro ao inserir: " + ex.Message);
            }
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
