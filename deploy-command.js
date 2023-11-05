/* eslint-disable @typescript-eslint/no-var-requires */
import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
import * as commands from './dist/commands';

dotenv.config();

const commandList = [];

for (const key of Object.keys(commands)) {
  const command = commands[key];
  commandList.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.token);

// and deploy your commands!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.clientId,
        process.env.guildId
      ),
      { body: commandList }
    );
    // const data = await rest.put(
    //   Routes.applicationCommands(process.env.clientId),
    //   {
    //     body: commandList,
    //   }
    // );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
