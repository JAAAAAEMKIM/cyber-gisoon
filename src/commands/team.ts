import {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
} from "discord.js";

import { User } from "../entities/user";

export const data = new SlashCommandBuilder()
  .setName("team")
  .setDescription("싸이버거순이 팀을 짜줍니다!");
export async function execute(interaction: CommandInteraction) {
  const users = await User.find();
  const options = users
    .sort((a, b) => b.mmr - a.mmr)
    .map((v) => ({
      label: v.name,
      description: v.nickname,
      value: v.name,
    }));
  const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
    new SelectMenuBuilder()
      .setCustomId("select")
      .setPlaceholder("Nothing selected")
      .setMinValues(2)
      .setMaxValues(10)
      .addOptions(options)
  );

  await interaction.reply({ content: "Pong!", components: [row] });
}
