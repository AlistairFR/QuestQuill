import { SlashCommandBuilder } from "@discordjs/builders";

export const RollCommand = {
    data : new SlashCommandBuilder()
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
    async execute(interaction: { isChatInputCommand: () => any; options: any; }) {
        const options = interaction.options;
        const count = options.getNumber('count') ?? 1;
        const sides = options.getString('sides', true);
        const bonus = options.getNumber('bonus') ?? 0;

        // Roll "count" number of dice with "sides" number of sides and add "bonus"
        const rolls = [];
        for (let i = 0; i < count; i++) {
            rolls.push(Math.floor(Math.random() * sides) + 1);
        }
        const total = rolls.reduce((a, b) => a + b) + bonus;
    }
};