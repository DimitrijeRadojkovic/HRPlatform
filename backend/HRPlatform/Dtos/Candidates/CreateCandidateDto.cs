namespace HRPlatform.Dtos.Candidates
{
    public class CreateCandidateDto
    {
        public string FullName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
    }
}