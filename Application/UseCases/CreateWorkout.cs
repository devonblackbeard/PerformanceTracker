using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Linq;
using System.Threading.Tasks;

namespace Application.UseCases
{
    public class CreateWorkout
    {
        public class Command : IRequest
        {
            public Workout Workout { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
               foreach (var move in request.Workout.Moves)
               {
                    move.Id = 0;
               }

                _context.Workouts.Add(request.Workout);
                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}
