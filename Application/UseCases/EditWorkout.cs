using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System.Threading;
using System.Threading.Tasks;

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
                var workout = await _context.Workouts.FindAsync(request.Workout.Id);

                _mapper.Map(request.Workout, workout);

                await _context.SaveChangesAsync();

                return Unit.Value;

            }
        }
    }
}
