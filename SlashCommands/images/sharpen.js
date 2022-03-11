const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "sharpen",
    description: "sharpen image",
    clientPermissions: ["ATTACH_FILES"],
    options: [{
        name: "target",
        description: "select a target",
        type: "USER",
        required: false
    }],

    run: async (client, interaction) => {

        const user = interaction.options.getUser('target') || interaction.member;
        const avatar = user.displayAvatarURL({
            format: "png"
        })
        const image = await Canvas.sharpen(avatar);
        const attachment = new MessageAttachment(image, "sharpen.png");

        interaction.followUp({
            embeds: [],
            files: [attachment]
        }).catch(() => {});
    },
};