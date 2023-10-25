import { SlashCommandBuilder } from '@discordjs/builders';

const rollCommand = new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a dice')
    .addNumberOption((option) => option
        .setName('count')
        .setDescription('Number of dice to roll')
        .setRequired(false)
    )
    .addStringOption((option) => option
        .setName('sides')
        .setDescription('Number of sides on the dice')
        .setRequired(false)
        .addChoices(
            { name: 'd4', value: '4' },
            { name: 'd6', value: '6' },
            { name: 'd8', value: '8' },
            { name: 'd10', value: '10' },
            { name: 'd12', value: '12' },
            { name: 'd20', value: '20' },
            { name: 'd100', value: '100' }
        )
    )
    .addStringOption((option) => option
        .setName('modifier')
        .setDescription('Modifier to add to the roll')
        .setRequired(false)
    );

const RollCommand = rollCommand.toJSON();

export { RollCommand };