const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const play = require('play-dl');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Jouer une musique')
        .addStringOption(option =>
            option.setName('url')
                .setDescription('URL YouTube')
                .setRequired(true)),

    async execute(interaction) {
        const url = interaction.options.getString('url');
        const member = interaction.member;
        const voiceChannel = member.voice.channel;

        if (!voiceChannel)
            return interaction.reply({ content: '❗ Rejoins un salon vocal.', ephemeral: true });

        const connection = joinVoiceChannel({
            channelId: voiceChannel.id,
            guildId: interaction.guild.id,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = await play.stream(url);
        const resource = createAudioResource(stream.stream, { inputType: stream.type });

        const player = createAudioPlayer();
        player.play(resource);

        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => {
            connection.destroy();
        });

        await interaction.reply(`🎵 Lecture en cours : ${url}`);
    },
};