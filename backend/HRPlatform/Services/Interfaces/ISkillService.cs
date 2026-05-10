using HRPlatform.Dtos.Skills;

namespace HRPlatform.Services.Interfaces
{
    public interface ISkillService
    {
        Task<SkillDto> CreateSkillDtoAsync(CreateSkillDto skillDto);
        Task<List<SkillDto>> GetAllAsync();
    }
}
