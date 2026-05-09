using HRPlatform.Domain.Entities;
using HRPlatform.Dtos.Skills;
using HRPlatform.Infrastructure.Data;
using HRPlatform.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRPlatform.Services.Implementations
{
    public class SkillService : ISkillService
    {
        private readonly AppDbContext _context;
        public SkillService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<SkillDto> CreateSkillDtoAsync(CreateSkillDto skillDto)
        {
            var skillNameExists = await _context.Skills.AnyAsync(s => s.Name == skillDto.Name);

            if (skillNameExists) 
            {
                throw new Exception("Skill with name " +  skillDto.Name + " already exists.");
            }

            var skill = new Skill { Name = skillDto.Name };

            _context.Skills.Add(skill);

            await _context.SaveChangesAsync();

            return new SkillDto { Id = skill.Id, Name = skill.Name };
        }
    }
}
