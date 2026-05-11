using HRPlatform.Dtos;
using HRPlatform.Dtos.Candidates;

namespace HRPlatform.Services.Interfaces
{
    public interface ICandidateService
    {
        Task<CandidateDetailsDto> CreateAsync(CreateCandidateDto dto);
        Task AddSkillAsync(int candidateId, int skillId);
        Task RemoveSkillAsync(int candidateId, int skillId);
        Task DeleteAsync(int id);
        Task<PagedResult<CandidateDetailsDto>> SearchAsync(string? name, List<string>? skills, int page, int pageSize);
        Task<List<CandidateDetailsDto>> GetAllAsync(int page, int pageSize);
    }
}