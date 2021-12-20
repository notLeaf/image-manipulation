const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "distracted",
    description: "distracted image",
    clientPermissions: "ATTACH_FILES",
    options: [{
        name: "target",
        description: "select a target",
        type: "USER",
        required: true
    }],

    run: async (client, interaction) => {

        const user = interaction.options.getUser('target');
        const avatar = user.displayAvatarURL({
            format: "png"
        })
        const image = await Canvas.distracted(interaction.member.displayAvatarURL({
            format: "png"
        }), avatar, interaction.client.user.displayAvatarURL({
            format: "png"
        }));
        const attachment = new MessageAttachment(image, "distracted.png");

        interaction.followUp({
            embeds: [],
            files: [attachment]
        }).catch(() => {});
    },
};