// Require the necessary discord.js classes
import dotenv from 'dotenv';
import AppDataSource from './dataSource';

import * as commands from './commands';
import * as events from './events';

import { Client, Collection, GatewayIntentBits } from 'discord.js';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('datasource init'); // here you can start to work with your database
  })
  .catch((error) => console.log(error));

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.commands = new Collection();

for (const key of Object.keys(commands)) {
  const command = commands[key];
  client.commands.set(command.data.name, command);
}
for (const key of Object.keys(events)) {
  const event = events[key];
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Log in to Discord with your client's token
client.login(process.env.token);
