// Require the necessary discord.js classes
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv'
import * as fs from 'fs';
import * as path from 'path';

import {connect} from './database/connect';

dotenv.config()
const token = process.env.BOT_TOKEN;

connect(
    process.env.MONGO_USER!,
    process.env.MONGO_PASS!,
    process.env.MONGO_HOST!,
    +process.env.MONGO_PORT!,
    process.env.MONGO_DB!,
    process.env.MONGO_QUERY
  )
  .then(result => {
    if (!result) {
      console.log('database connect failed')
      return;
    }
    
    // Create a new client instance
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });
    
    const commands = new Collection();
    const commandsPath = path.join(__dirname, '../commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
    
    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
        const command = commands.get(interaction.commandName);
    
        console.log(command)
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            // @ts-ignore
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    })
    
    client.login(token);
  });