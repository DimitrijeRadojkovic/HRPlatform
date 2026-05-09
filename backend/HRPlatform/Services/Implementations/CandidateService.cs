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
    }
}