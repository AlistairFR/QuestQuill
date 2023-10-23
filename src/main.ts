import { Client, IntentsBitField, Partials } from 'discord.js';
import { TOKEN } from './config';
import { onMessageCreate, onReady } from './Listeners';

// Spécifie le type d'event que le bot écoutera avec INTENTS
const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.DirectMessages)

// Création du client
const client = new Client({
    intents: [myIntents],
    partials: [Partials.Channel]
});

onReady(client);
onMessageCreate(client);

client.login(TOKEN);