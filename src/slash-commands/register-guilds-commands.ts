import { REST } from "discord.js";
import { SlashCommands } from "."
import { APPLICATION_ID, GUILD_ID, TOKEN } from "../config";
import { Routes } from "discord-api-types/v9";

const registerGuildsCommands = async () => {
    try {
        const commands = SlashCommands.map(({ command }) =>command.toJSON());
        const rest = new REST({ version: '9' }).setToken(TOKEN);
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(APPLICATION_ID, GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
};

registerGuildsCommands();