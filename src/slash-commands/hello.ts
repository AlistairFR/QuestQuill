import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

export const HelloCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('hello')
        .setDescription('Replies with a greeting'),
    async run(interaction) {
        await interaction.reply({
            content: `Hello, ${interaction.user.username}!`,
        });
    }
};