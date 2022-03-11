const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "clyde",
    description: "clyde image",
    category: "images",
    clientPermissions: ["ATTACH_FILES"],
    options: [{
        name: "query",
        description: "text you want to say",
        type: "STRING",
        required: true
    }],

    run: async (client, interaction, args) => {

        const text = interaction.options.getString('query')?.trim()?.split(/ +/g)?.join(" ");
        if (text.length > 100) text = text.slice(0, 95) + '...'

        const image = await Canvas.clyde(text);
        const attachment = new MessageAttachment(image, "clyde.png");

        interaction.followUp({
            embeds: [],
            files: [attachment]
        }).catch(() => {});
    },
};