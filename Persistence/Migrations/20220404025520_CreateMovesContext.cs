using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateMovesContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Move_Workouts_WorkoutId",
                table: "Move");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Move",
                table: "Move");

            migrationBuilder.RenameTable(
                name: "Move",
                newName: "Moves");

            migrationBuilder.RenameIndex(
                name: "IX_Move_WorkoutId",
                table: "Moves",
                newName: "IX_Moves_WorkoutId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Moves",
                table: "Moves",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Moves_Workouts_WorkoutId",
                table: "Moves",
                column: "WorkoutId",
                principalTable: "Workouts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Moves_Workouts_WorkoutId",
                table: "Moves");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Moves",
                table: "Moves");

            migrationBuilder.RenameTable(
                name: "Moves",
                newName: "Move");

            migrationBuilder.RenameIndex(
                name: "IX_Moves_WorkoutId",
                table: "Move",
                newName: "IX_Move_WorkoutId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Move",
                table: "Move",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Move_Workouts_WorkoutId",
                table: "Move",
                column: "WorkoutId",
                principalTable: "Workouts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
