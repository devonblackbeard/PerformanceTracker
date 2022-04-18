using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.UseCases
{
    public class EditWorkout
    {
        public class Command : IRequest
        {
            public Workout Workout { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }


            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {               

                var moves = await _context.Moves.Select(m => m).ToListAsync();
                var movesForThisWorkout = moves.Where(w => w.WorkoutId == request.Workout.Id).ToList();

                var workoutA = await _context.Workouts.FindAsync(request.Workout.Id);
                workoutA.Moves = movesForThisWorkout;


                var commonMoves = workoutA.Moves.Select(m => m.Id).Intersect(request.Workout.Moves.Select(m => m.Id).ToList());
                var newMoveIds = request.Workout.Moves.Select(m => m.Id).Except(commonMoves);
                foreach (var move in
                //// change ID to 0
                from move in request.Workout.Moves
                where newMoveIds.Contains(move.Id)
                select move)
                {
                    move.Id = 0;
                }

                _mapper.Map(request.Workout, workoutA);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}
