﻿using AutoMapper;
using Domain;


namespace Application.Core
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Workout, Workout>();
            CreateMap<Move, Move>();
        }
    }
}
