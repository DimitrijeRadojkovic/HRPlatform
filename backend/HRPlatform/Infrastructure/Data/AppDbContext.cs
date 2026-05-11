using HRPlatform.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HRPlatform.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Candidate> Candidates { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<CandidateSkill> CandidateSkills { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CandidateSkill>()
                .HasKey(cs => new { cs.CandidateId, cs.SkillId });

            modelBuilder.Entity<CandidateSkill>()
                .HasOne(cs => cs.Candidate)
                .WithMany(c => c.CandidateSkills)
                .HasForeignKey(cs => cs.CandidateId);

            modelBuilder.Entity<CandidateSkill>()
                .HasOne(cs => cs.Skill)
                .WithMany(s => s.CandidateSkills)
                .HasForeignKey(cs => cs.SkillId);

            modelBuilder.Entity<Skill>()
                .HasIndex(s => s.Name)
                .IsUnique();

            modelBuilder.Entity<Candidate>()
                .HasIndex(c => c.Email)
                .IsUnique();

            modelBuilder.Entity<Skill>().HasData(
                new Skill { Id = 1, Name = "C#" },
                new Skill { Id = 2, Name = "Java" },
                new Skill { Id = 3, Name = "English" },
                new Skill { Id = 4, Name = "SQL" },
                new Skill { Id = 5, Name = "ASP.NET Core" },
                new Skill { Id = 6, Name = "Docker" }
            );

            modelBuilder.Entity<Candidate>().HasData(
                new Candidate
                {
                    Id = 1,
                    FullName = "John Doe",
                    DateOfBirth = new DateTime(1999, 5, 10, 0, 0, 0, DateTimeKind.Utc),
                    ContactNumber = "+38160111222",
                    Email = "john.doe@test.com"
                },
                new Candidate
                {
                    Id = 2,
                    FullName = "Marko Markovic",
                    DateOfBirth = new DateTime(1997, 8, 21, 0, 0, 0, DateTimeKind.Utc),
                    ContactNumber = "+38163123456",
                    Email = "marko.markovic@test.com"
                },
                new Candidate
                {
                    Id = 3,
                    FullName = "Ana Petrovic",
                    DateOfBirth = new DateTime(2000, 12, 3, 0, 0, 0, DateTimeKind.Utc),
                    ContactNumber = "+381651112233",
                    Email = "ana.petrovic@test.com"
                }
            );

            modelBuilder.Entity<CandidateSkill>().HasData(
                // John Doe
                new CandidateSkill { CandidateId = 1, SkillId = 1 }, // C#
                new CandidateSkill { CandidateId = 1, SkillId = 3 }, // English
                new CandidateSkill { CandidateId = 1, SkillId = 5 }, // ASP.NET Core

                // Marko Markovic
                new CandidateSkill { CandidateId = 2, SkillId = 2 }, // Java
                new CandidateSkill { CandidateId = 2, SkillId = 4 }, // SQL
                new CandidateSkill { CandidateId = 2, SkillId = 6 }, // Docker

                // Ana Petrovic
                new CandidateSkill { CandidateId = 3, SkillId = 1 }, // C#
                new CandidateSkill { CandidateId = 3, SkillId = 3 }, // English
                new CandidateSkill { CandidateId = 3, SkillId = 4 }  // SQL
            );
        }
    }
}