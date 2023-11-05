import parsed from "../constants";

import { SlashCommandBuilder } from "discord.js";
import scoreManager from "../modules/scoreManager";

const choices = Object.entries(parsed)
  .sort((a, b) => b[1].mmr - a[1].mmr)
  .map(([k, v]) => ({
    name: k,
    value: k,
  }));

export const data = new SlashCommandBuilder()
  .setName("update")
  .setDescription("점수를 업데이트합니다. /update [사람이름] [승] [패]")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("업데이트할 사람의 이름")
      .setRequired(true)
      .addChoices(...choices)
  )
  .addNumberOption((option) =>
    option.setName("win").setDescription("승리한 경기 수").setRequired(true)
  )
  .addNumberOption((option) =>
    option.setName("lose").setDescription("패배한 경기 수").setRequired(true)
  );
export async function execute(interaction: any) {
  // const target = interaction.options.getUser('target');
  const win = interaction.options.getNumber("win");
  const lose = interaction.options.getNumber("lose");
  const name = interaction.options.getString("name");

  scoreManager.update(name, { win, lose });
  await interaction.reply({ content: "업데이트 완료", ephemeral: true });
}
