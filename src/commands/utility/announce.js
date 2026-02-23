const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce')
        .setDescription('Envoyer une annonce')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Salon cible')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('message')
                .setDescription('Message à envoyer')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        const message = interaction.options.getString('message');

        await channel.send(`📢 **Annonce officielle**\n\n${message}`);
        await interaction.reply({ content: 'Annonce envoyée ✔️', ephemeral: true });
    },
};