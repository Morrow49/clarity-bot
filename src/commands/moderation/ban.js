const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Bannir un utilisateur')
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('Utilisateur à bannir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison du bannissement')
                .setRequired(false))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur');
        const reason = interaction.options.getString('raison') || 'Aucune raison spécifiée';

        const member = await interaction.guild.members.fetch(user.id);

        await member.ban({ reason });

        await interaction.reply(`🔨 ${user.tag} a été banni.\nRaison : ${reason}`);
    },
};