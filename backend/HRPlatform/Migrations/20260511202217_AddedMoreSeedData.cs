using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HRPlatform.Migrations
{
    /// <inheritdoc />
    public partial class AddedMoreSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ContactNumber", "Email" },
                values: new object[] { "+38160111222", "john.doe@test.com" });

            migrationBuilder.InsertData(
                table: "Candidates",
                columns: new[] { "Id", "ContactNumber", "DateOfBirth", "Email", "FullName" },
                values: new object[,]
                {
                    { 2, "+38163123456", new DateTime(1997, 8, 21, 0, 0, 0, 0, DateTimeKind.Utc), "marko.markovic@test.com", "Marko Markovic" },
                    { 3, "+381651112233", new DateTime(2000, 12, 3, 0, 0, 0, 0, DateTimeKind.Utc), "ana.petrovic@test.com", "Ana Petrovic" }
                });

            migrationBuilder.InsertData(
                table: "Skills",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 4, "SQL" },
                    { 5, "ASP.NET Core" },
                    { 6, "Docker" }
                });

            migrationBuilder.InsertData(
                table: "CandidateSkills",
                columns: new[] { "CandidateId", "SkillId" },
                values: new object[,]
                {
                    { 1, 5 },
                    { 2, 2 },
                    { 2, 4 },
                    { 2, 6 },
                    { 3, 1 },
                    { 3, 3 },
                    { 3, 4 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 1, 5 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 2, 2 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 2, 4 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 2, 6 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 3, 1 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 3, 3 });

            migrationBuilder.DeleteData(
                table: "CandidateSkills",
                keyColumns: new[] { "CandidateId", "SkillId" },
                keyValues: new object[] { 3, 4 });

            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Skills",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.UpdateData(
                table: "Candidates",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ContactNumber", "Email" },
                values: new object[] { "123456", "john@test.com" });
        }
    }
}
