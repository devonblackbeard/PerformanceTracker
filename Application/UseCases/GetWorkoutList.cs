using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UseCases
{
    public class GetWorkoutList
    {
        public class Query : IRequest<List<Workout>>
        {

        }

        public class Handler : IRequestHandler<Query, List<Workout>>
        {
            private readonly DataContext _context;
            private readonly ILogger<GetWorkoutList> _logger;

            public Handler(DataContext context, ILogger<GetWorkoutList> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<List<Workout>> Handle(Query request, CancellationToken cancellationToken)
            {
                var workouts = await _context.Workouts.Include("Moves").ToListAsync(cancellationToken);

                return workouts;
            }
        }
    }
}
