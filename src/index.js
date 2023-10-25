// Load environment variables from .env file
require("dotenv").config();

// Import necessary modules from discord.js library
const { Client, IntentsBitField, REST, Routes } = require("discord.js");

// Import the RollCommand from the ./commands/roll file
const { RollCommand } = require("./commands/roll");

// Get the necessary environment variables
const APPLICATION_ID = process.env.APPLICATION_ID;
const GUILD_ID = process.env.GUILD_ID;
const TOKEN = process.env.TOKEN;

// Create a new Discord client instance
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Create a new REST API client instance and set the token
const rest = new REST({ version: "10" }).setToken(TOKEN);

// Log in to Discord with the provided token
client.login(TOKEN);

// When the client is ready, log a message to the console
client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

// When an interaction (e.g. a slash command) is created, handle it
client.on("interactionCreate", async (interaction) => {
  // If the interaction is not a command, ignore it
  if (!interaction.isCommand()) return;

  // If the command is the "roll" command, handle it
  if (interaction.commandName === "roll") {
    // Get the values of the "count", "sides", and "modifier" options
    const count = interaction.options.getNumber("count") || 1;
    const sides = parseInt(interaction.options.getString("sides")) || 20;
    const modifier = parseInt(interaction.options.getString("modifier")) || 0;

    // Roll the dice and store the results in an array
    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }

    // Generate a string representation of the rolls
    const rollsText =
      rolls.length > 10
        ? `(${rolls.length} d${sides}s)`
        : `(${rolls.join(", ")})`;

    // Calculate the total value of the dice rolls and the modifier
    const diceTotal = rolls.reduce((a, b) => a + b, 0);
    const total = diceTotal + modifier;

    // Generate a string representation of the modifier
    const modifierText =
      modifier > 0
        ? ` + ${modifier}`
        : modifier < 0
        ? ` - ${Math.abs(modifier)}`
        : "";

    // Generate a string representation of the final result
    const replyText =
      rolls.length > 1
        ? `You rolled ${rollsText}${modifierText}, for a total of ${total} !`
        : rolls.length === 1 && modifier !== 0
        ? `You rolled ${diceTotal}${modifierText}, for a total of ${total} !`
        : `You rolled ${total} !`;

    // Reply to the interaction with the final result
    await interaction.reply(replyText);
  }
});

// Define a main function that registers the slash commands with Discord
async function main() {
  const commands = [RollCommand];
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

// Call the main function to register the slash commands
main();