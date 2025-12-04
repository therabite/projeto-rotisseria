using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoGigiDede.Models
{
    public class Usuario
    {
        [Key]
        public int? id { get; set; }

        [Required(ErrorMessage = "Nome é obrigatório")]
        public string? nome { get; set; }

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string? email { get; set; }

        [Required(ErrorMessage = "Senha é obrigatória")]
        [DataType(DataType.Password)]
        [MinLength(6, ErrorMessage = "Senha deve ter ao menos 6 caracteres")]
        public string? senha { get; set; }

        // Não mapeado no BD — apenas para confirmação no formulário
        [NotMapped]
        [Required(ErrorMessage = "Confirmação de senha é obrigatória")]
        [DataType(DataType.Password)]
        [Compare("senha", ErrorMessage = "As senhas não conferem.")]
        [Display(Name = "Confirmar senha")]
        public string? ConfirmPassword { get; set; }
    }
}
