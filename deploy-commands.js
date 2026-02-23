const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { clientId, guildId, token } = require('./src/config');

const commands = [];
const commandFolders = fs.readdirSync('./src/commands');

for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./src/commands/${folder}/${file}`);
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
    );
    console.log('✅ Commandes déployées');
})();