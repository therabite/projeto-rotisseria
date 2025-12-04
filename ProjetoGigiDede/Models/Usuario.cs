using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjetoGigiDede.Models
{
    public class Usuario
    {
        [Required, Key]
        public int id { get; set; }
        [Required, StringLength(100)]
        public string? nome { get; set; }
        [Required, EmailAddress, StringLength(100)]
        public string? email { get; set; }
        [Required]
        public int? senha { get; set; }

    }
}
