﻿using Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Workout> Workouts{ get; set; }
        public DbSet<Move> Moves{ get; set; }

    }
}
