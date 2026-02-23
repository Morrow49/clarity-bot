const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-structure')
        .setDescription('Créer une catégorie avec salons')
        .addStringOption(option =>
            option.setName('nom')
                .setDescription('Nom de la catégorie')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
        const name = interaction.options.getString('nom');

        const category = await interaction.guild.channels.create({
            name: name,
            type: ChannelType.GuildCategory,
        });

        await interaction.guild.channels.create({
            name: 'général',
            type: ChannelType.GuildText,
            parent: category.id,
        });

        await interaction.guild.channels.create({
            name: 'vocal',
            type: ChannelType.GuildVoice,
            parent: category.id,
        });

        await interaction.reply(`✔️ Structure "${name}" créée avec succès.`);
    },
};