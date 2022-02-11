using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Workouts.Any()) return;

            var workouts = new List<Workout>
            {
                new Workout
                {
                    Name = "Chest and Back",                    
                },
                new Workout
                {
                    Name = "Legs and Back"                   
                },

            };

            await context.Workouts.AddRangeAsync(workouts);
            await context.SaveChangesAsync();
        }
    }
}