using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Workout
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
