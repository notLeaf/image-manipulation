const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");
const {
    fail
} = require("../../config.json");

module.exports = {
    name: "clyde",
    description: "clyde image",
    clientPermissions: ["ATTACH_FILES"],
    options: [{
        name: "query",
        description: "text you want to say",
        type: "STRING",
        required: true
    }],

    run: async (client, interaction, args) => {

        const text = args.slice(0).join(' ');
        if (text.length > 100)
            return interaction.followUp({
                content: `${fail} Text can't be longer than 100 characters`
            })
        const image = await Canvas.clyde(text);
        const attachment = new MessageAttachment(image, "clyde.png");

        interaction.followUp({
            embeds: [],
            files: [attachment]
        }).catch(() => {});
    },
};