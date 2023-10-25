require("dotenv").config();
const { Client, IntentsBitField, REST, Routes } = require("discord.js");
const eventHandler = require("./handlers/eventHandler");

const APPLICATION_ID = process.env.APPLICATION_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

const rest = new REST({ version: "10" }).setToken(TOKEN);

client.login(TOKEN);

eventHandler(client);

async function main() {
  const commands = [];
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), {
      body: commands,
    });
    console.log("Slash commands were refreshed successfully!");
  } catch (error) {
    console.log(`There was an error during command refresh: ${error}`);
  }
}

main();
