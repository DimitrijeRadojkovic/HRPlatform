namespace HRPlatform.Domain.Entities
{
    public class Candidate
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }

        public ICollection<CandidateSkill> CandidateSkills { get; set; }
    }
}