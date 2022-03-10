using Application.UseCases;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class WorkoutsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Workout>>> GetWorkouts(CancellationToken ct)
        {
            return await Mediator.Send(new GetWorkoutList.Query(), ct);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetWorkoutById(int id, CancellationToken ct)
        {
            return await Mediator.Send(new GetWorkoutById.Query { Id = id }, ct);
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Workout workout)
        {
            return Ok(await Mediator.Send(new CreateWorkout.Command { Workout = workout}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(int id, Workout workout)
        {
            workout.Id = id;
            return Ok(await Mediator.Send(new EditWorkout.Command { Workout = workout }));
        }


    }
}