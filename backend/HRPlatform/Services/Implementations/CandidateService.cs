using HRPlatform.Domain.Entities;
using HRPlatform.Dtos.Candidates;
using HRPlatform.Infrastructure.Data;
using HRPlatform.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace HRPlatform.Services.Implementations
{
    public class CandidateService : ICandidateService
    {
        private readonly AppDbContext _context;

        public CandidateService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CandidateDto> CreateAsync(CreateCandidateDto dto)
        {
            var emailExists = await _context.Candidates
                .AnyAsync(c => c.Email == dto.Email);

            if (emailExists)
            {
                throw new Exception("Email already exists.");
            }

            var candidate = new Candidate
            {
                FullName = dto.FullName,
                DateOfBirth = dto.DateOfBirth,
                ContactNumber = dto.ContactNumber,
                Email = dto.Email
            };

            _context.Candidates.Add(candidate);

            await _context.SaveChangesAsync();

            return new CandidateDto
            {
                Id = candidate.Id,
                FullName = candidate.FullName,
                Email = candidate.Email
            };
        }
        public async Task AddSkillAsync(int candidateId, int skillId)
        {
            var candidate = await _context.Candidates
                .Include(c => c.CandidateSkills)
                .FirstOrDefaultAsync(c => c.Id == candidateId);

            if (candidate == null)
                throw new Exception("Candidate not found");

            var skill = await _context.Skills
                .FirstOrDefaultAsync(s => s.Id == skillId);

            if (skill == null)
                throw new Exception("Skill not found");

            var exists = await _context.CandidateSkills
                .AnyAsync(cs => cs.CandidateId == candidateId && cs.SkillId == skillId);

            if (exists)
                return;

            var candidateSkill = new CandidateSkill
            {
                CandidateId = candidateId,
                SkillId = skillId
            };

            _context.CandidateSkills.Add(candidateSkill);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveSkillAsync(int candidateId, int skillId)
        {
            var candidateSkill = await _context.CandidateSkills
                .FirstOrDefaultAsync(cs =>
                    cs.CandidateId == candidateId &&
                    cs.SkillId == skillId);

            if (candidateSkill == null)
                throw new Exception("Skill not assigned to candidate");

            _context.CandidateSkills.Remove(candidateSkill);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var candidate = await _context.Candidates
                .FirstOrDefaultAsync(c => c.Id == id);

            if (candidate == null)
                throw new Exception("Candidate not found");

            _context.Candidates.Remove(candidate); // Cascade delete is configured by EF Core conventions for required relationships
            await _context.SaveChangesAsync();
        }
        public async Task<List<CandidateDto>> SearchAsync(string? name, List<string>? skills)
        {
            var query = _context.Candidates
                .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c => c.FullName.Contains(name));
            }

            if (skills != null && skills.Any())
            {
                query = query.Where(c =>
                    c.CandidateSkills.Any(cs =>
                        skills.Contains(cs.Skill.Name)
                    )
                );
            }

            var result = await query
                .Select(c => new CandidateDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Email = c.Email
                })
                .ToListAsync();

            return result;
        }
    }
}