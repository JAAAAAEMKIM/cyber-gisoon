import parsed from '../constants';

import {
  SlashCommandBuilder,
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
} from 'discord.js';

const options = Object.entries(parsed)
  .sort((a, b) => b[1].mmr - a[1].mmr)
  .map(([k, v]) => ({
    label: k,
    description: v.nickname,
    value: k,
  }));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('team')
    .setDescription('싸이버거순이 팀을 짜줍니다!'),
  async execute(interaction: CommandInteraction) {
    console.log(options.length, parsed);

    const row = new ActionRowBuilder<SelectMenuBuilder>().addComponents(
      new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Nothing selected')
        .setMinValues(2)
        .setMaxValues(10)
        .addOptions(options)
    );

    await interaction.reply({ content: 'Pong!', components: [row] });
  },
};
