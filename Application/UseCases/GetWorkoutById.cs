using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace Application.UseCases
{
    public class GetWorkoutById
    {
        public class Query : IRequest<Workout>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Workout>
        {
            private readonly DataContext _context;
            private readonly ILogger<GetWorkoutList> _logger;

            public Handler(DataContext context, ILogger<GetWorkoutList> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<Workout> Handle(Query request, CancellationToken cancellationToken)
            {
                var workouts = await _context.Workouts.Include("Moves").ToListAsync(cancellationToken);
                var wo = workouts.Find(x => x.Id == request.Id);
               
                return wo;
            }
        }
    }
}
