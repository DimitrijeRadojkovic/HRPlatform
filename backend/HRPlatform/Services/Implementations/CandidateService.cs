using HRPlatform.Domain.Entities;
using HRPlatform.Dtos;
using HRPlatform.Dtos.Candidates;
using HRPlatform.Dtos.Skills;
using HRPlatform.Infrastructure.Data;
using HRPlatform.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace HRPlatform.Services.Implementations
{
    public class CandidateService : ICandidateService
    {
        private readonly AppDbContext _context;

        public CandidateService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<CandidateDetailsDto> CreateAsync(CreateCandidateDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.FullName))
                throw new Exception("Name can't be blank.");

            if (!Regex.IsMatch(dto.Email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$"))
                throw new Exception("Email is invalid.");

            if (!Regex.IsMatch(dto.ContactNumber, @"^\+?[0-9]{7,15}$"))
                throw new Exception("Phone number is invalid.");

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

            return new CandidateDetailsDto
            {
                Id = candidate.Id,
                FullName = candidate.FullName,
                Email = candidate.Email,
                ContactNumber = candidate.ContactNumber,
                DateOfBirth = candidate.DateOfBirth,
                Skills = new()
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
        public async Task<PagedResult<CandidateDetailsDto>> SearchAsync(
            string? name,
            List<string>? skills,
            int page,
            int pageSize)
        {
            var query = _context.Candidates
                .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                .AsQueryable();

            if (!string.IsNullOrWhiteSpace(name))
            {
                query = query.Where(c => c.FullName.ToLower().Contains(name.ToLower()));
            }

            if (skills != null && skills.Any())
            {
                query = query.Where(c =>
                    skills.All(skill =>
                        c.CandidateSkills.Any(cs =>
                            cs.Skill.Name == skill
                        )
                    )
                );
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new CandidateDetailsDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    Email = c.Email,
                    DateOfBirth = c.DateOfBirth,
                    ContactNumber = c.ContactNumber,
                    Skills = c.CandidateSkills
                        .Select(cs => new SkillDto
                        {
                            Id = cs.Skill.Id,
                            Name = cs.Skill.Name
                        })
                        .ToList()
                })
                .ToListAsync();

            return new PagedResult<CandidateDetailsDto>
            {
                Items = items,
                TotalCount = totalCount,
                Page = page,
                PageSize = pageSize
            };
        }
        public async Task<List<CandidateDetailsDto>> GetAllAsync(int page, int pageSize)
        {
            var candidates = await _context.Candidates
                .AsNoTracking()
                .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new CandidateDetailsDto
                {
                    Id = c.Id,
                    FullName = c.FullName,
                    DateOfBirth = c.DateOfBirth,
                    ContactNumber = c.ContactNumber,
                    Email = c.Email,

                    Skills = c.CandidateSkills
                        .Select(cs => new SkillDto
                        {
                            Id = cs.Skill.Id,
                            Name = cs.Skill.Name
                        })
                        .ToList()
                })
                .ToListAsync();

            return candidates;
        }
    }
}