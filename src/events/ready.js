module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`✅ Clarity connecté en tant que ${client.user.tag}`);
    },
};