const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "ping",
    description: "websocket ping",
    type: 'CHAT_INPUT',

    run: async (client, interaction) => {
        interaction.followUp({ content: `${client.ws.ping} ws` });
    },
};
