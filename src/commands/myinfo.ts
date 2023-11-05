import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { discordUserMap } from "../constants";
import scoreManager from "../modules/scoreManager";

export const data = new SlashCommandBuilder()
  .setName("myinfo")
  .setDescription("내 점수와 정보를 조회합니다.");
export async function execute(interaction: CommandInteraction) {
  const name = discordUserMap[interaction.user.username];
  const score = await scoreManager.getScoreByName(name);
  const rank = await scoreManager.getRankByName(name);

  await interaction.reply({
    content: `현재 MMR: ${score}\n현재 순위: ${rank} / 10`,
  });
}
