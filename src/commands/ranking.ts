import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import scoreManager from "../modules/scoreManager";

export const data = new SlashCommandBuilder()
  .setName("ranking")
  .setDescription("전체 랭킹을 조회합니다.");
export async function execute(interaction: CommandInteraction) {
  const ranking = await scoreManager.getAllRank();

  await interaction.reply({
    content: ranking,
  });
}
