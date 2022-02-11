// using Application.Workouts;
// using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Persistence;


namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        private static IConfiguration _config;
        public static IServiceCollection AddApplicationServices(IServiceCollection services, IConfiguration config)
        {
            _config = config;

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(_config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy => {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            //services.AddMediatR(typeof(GetActivityList.Handler).Assembly);
            //services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            return services;
        }
    }
}
