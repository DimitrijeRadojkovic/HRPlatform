using HRPlatform.Dtos.Skills;

namespace HRPlatform.Dtos.Candidates
{
    public class CandidateDetailsDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }

        public List<SkillDto> Skills { get; set; } = new();
    }
}