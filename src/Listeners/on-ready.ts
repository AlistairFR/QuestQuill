import { Client } from 'discord.js';

export const onReady = (client: Client) => {
    client.on('ready', () => {
        console.log(`Logged in as ${client.user?.username}!`);
    }
    );
};
