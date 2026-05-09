namespace HRPlatform.Domain.Entities
{
    public class Skill
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<CandidateSkill> CandidateSkills { get; set; }
    }
}