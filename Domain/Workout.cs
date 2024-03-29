﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Workout
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Move> Moves { get; set; }
    }
}
