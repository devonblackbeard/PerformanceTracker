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
    public class DeleteWorkout
    {
        public class Command : IRequest
        {
            public int Id { get; set; }
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
                var moves = _context.Moves.Where(s => s.WorkoutId == request.Id).ToList();                
                _context.RemoveRange(moves);
                await _context.SaveChangesAsync();

                var workout = await _context.Workouts.FindAsync(request.Id);
                if (workout != null)
                {
                    _context.Workouts.Remove(workout);
                }

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}
