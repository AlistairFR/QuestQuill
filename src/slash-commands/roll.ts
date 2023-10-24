import { SlashCommandBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";
import { SlashCommand } from "../types";

export const RollCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a die')
        .addNumberOption((option) =>
            option.setName('count')
            .setDescription('The number of dice to roll')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option.setName('sides')
            .setDescription('The die you want to roll')
            .addChoices(
                {'name': 'd4', 'value': '4'},
                {'name': 'd6', 'value': '6'},
                {'name': 'd8', 'value': '8'},
                {'name': 'd10', 'value': '10'},
                {'name': 'd12', 'value': '12'},
                {'name': 'd20', 'value': '20'},
                {'name': 'd100', 'value': '100'}
            )
            .setRequired(true)
        )
        .addNumberOption((option) =>
            option.setName('bonus')
            .setDescription('The bonus to add to the roll')
            .setRequired(false)
        ),
    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const options = interaction.options;
        const count = options.getNumber('count') ?? 1;
        const sides = options.getString('sides', true);
        // TODO: actually roll the dice and send the result to the user
    }
};