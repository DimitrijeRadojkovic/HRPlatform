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
            if(skillDto.Name == "")
            {
                throw new Exception("Name can't be blank.");
            }

            var skill = new Skill { Name = skillDto.Name };

            _context.Skills.Add(skill);

            await _context.SaveChangesAsync();

            return new SkillDto { Id = skill.Id, Name = skill.Name };
        }

        public async Task<List<SkillDto>> GetAllAsync()
        {
            var skills = await _context.Skills.
                AsNoTracking().
                Select(s => new SkillDto { Id = s.Id, Name = s.Name }).ToListAsync();

            return skills;
        }

        public async Task DeleteAsync(int id)
        {
            var skill = await _context.Skills
                .FirstOrDefaultAsync(s => s.Id == id);

            if (skill == null)
                throw new Exception("Skill not found");

            _context.Skills.Remove(skill); // Cascade delete is configured by EF Core conventions for required relationships
            await _context.SaveChangesAsync();
        }
    }
}
