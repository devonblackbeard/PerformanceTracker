using Application.UseCases;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
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

    }
}