using HRPlatform.Dtos.Candidates;
using HRPlatform.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace HRPlatform.Controllers
{
    [ApiController]
    [Route("api/candidates")]
    public class CandidatesController : ControllerBase
    {
        private readonly ICandidateService _candidateService;

        public CandidatesController(ICandidateService candidateService)
        {
            _candidateService = candidateService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCandidateDto dto)
        {
            try
            {
                var result = await _candidateService.CreateAsync(dto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{candidateId}/skills/{skillId}")]
        public async Task<IActionResult> AddSkill(int candidateId, int skillId)
        {
            try
            {
                await _candidateService.AddSkillAsync(candidateId, skillId);
                return Ok("Skill added to candidate");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{candidateId}/skills/{skillId}")]
        public async Task<IActionResult> RemoveSkill(int candidateId, int skillId)
        {
            try
            {
                await _candidateService.RemoveSkillAsync(candidateId, skillId);
                return Ok("Skill removed from candidate");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _candidateService.DeleteAsync(id);
                return Ok("Candidate deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}