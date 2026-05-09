namespace HRPlatform.Domain.Entities
{
    public class CandidateSkill
    {
        public int CandidateId { get; set; }
        public Candidate Candidate { get; set; }

        public int SkillId { get; set; }
        public Skill Skill { get; set; }
    }
}