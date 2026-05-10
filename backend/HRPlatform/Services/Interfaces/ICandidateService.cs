using HRPlatform.Dtos.Candidates;

namespace HRPlatform.Services.Interfaces
{
    public interface ICandidateService
    {
        Task<CandidateDto> CreateAsync(CreateCandidateDto dto);
        Task AddSkillAsync(int candidateId, int skillId);
        Task RemoveSkillAsync(int candidateId, int skillId);
        Task DeleteAsync(int id);
        Task<List<CandidateDto>> SearchAsync(string? name, List<string>? skills);
        Task<List<CandidateDetailsDto>> GetAllAsync(int page, int pageSize);
    }
}