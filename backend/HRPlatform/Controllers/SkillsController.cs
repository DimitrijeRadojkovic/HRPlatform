using HRPlatform.Dtos.Skills;
using HRPlatform.Services.Implementations;
using HRPlatform.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HRPlatform.Controllers
{
    [ApiController]
    [Route("api/skills")]
    public class SkillsControler : ControllerBase
    {
        private readonly ISkillService _skillService;
        public SkillsControler(ISkillService skillService)
        {
            _skillService = skillService;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateSkillDto skillDto)
        {
            try
            {
                var result = await _skillService.CreateSkillDtoAsync(skillDto);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var result = await _skillService.GetAllAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSkill(int id)
        {
            try
            {
                await _skillService.DeleteAsync(id);
                return Ok("Skill deleted");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
