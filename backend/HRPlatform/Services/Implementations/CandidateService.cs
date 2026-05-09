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
    }
}