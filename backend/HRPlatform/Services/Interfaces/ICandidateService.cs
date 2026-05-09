using HRPlatform.Dtos.Candidates;

namespace HRPlatform.Services.Interfaces
{
    public interface ICandidateService
    {
        Task<CandidateDto> CreateAsync(CreateCandidateDto dto);
    }
}