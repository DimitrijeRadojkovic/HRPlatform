using HRPlatform.Dtos.Candidates;

namespace HRPlatform.Services.Interfaces
{
    public interface ICandidateService
    {
        Task<CandidateDto> CreateAsync(CreateCandidateDto dto);
        Task AddSkillAsync(int candidateId, int skillId);
    }
}