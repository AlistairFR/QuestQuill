require("dotenv").config();
const { Client, IntentsBitField, REST, Routes } = require("discord.js");
const { RollCommand } = require("./commands/roll");

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

client.on("ready", () => {
  console.log(`${client.user.tag} is online!`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "roll") {
    const count = interaction.options.getNumber("count") || 1;
    const sides = parseInt(interaction.options.getString("sides")) || 20;
    const modifier = parseInt(interaction.options.getString("modifier")) || 0;

    const rolls = [];
    for (let i = 0; i < count; i++) {
      rolls.push(Math.floor(Math.random() * sides) + 1);
    }
    // I want to show the detail of the rolls, but not if there are too many
    const rollsText =
      rolls.length > 10
        ? `(${rolls.length} d${sides}s)`
        : `(${rolls.join(", ")})`;

    const diceTotal = rolls.reduce((a, b) => a + b, 0);
    const total = diceTotal + modifier;
    // I want to show the modifier, but not if it's 0
    const modifierText =
      modifier > 0
        ? ` + ${modifier}`
        : modifier < 0
        ? ` - ${Math.abs(modifier)}`
        : "";

    const replyText =
      rolls.length > 1
        ? `You rolled ${rollsText}${modifierText}, for a total of ${total} !`
        : rolls.length === 1 && modifier !== 0
        ? `You rolled ${diceTotal}${modifierText}, for a total of ${total} !`
        : `You rolled ${total} !`;
    await interaction.reply(replyText);
  }
});

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

main();
