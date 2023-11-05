import { Events, Interaction } from "discord.js";
import TeamMaker from "../modules/teamMaker";

export default {
  name: Events.InteractionCreate,
  async execute(interaction: Interaction) {
    if (!interaction.isSelectMenu()) return;

    const teamMaker = new TeamMaker();
    teamMaker.setPlayers(interaction.values);
    const [A, B] = teamMaker.calculate();

    const text = `
      좌: ${A.map((player) => player.name)}
      우: ${B.map((player) => player.name)}
    `;

    await interaction.reply(text);
  },
};
