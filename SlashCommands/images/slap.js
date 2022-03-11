const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "slap",
    description: "slap image",
    category: "images",
    clientPermissions: ["ATTACH_FILES"],
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

        const image = await Canvas.slap(interaction.member.displayAvatarURL({
            format: "png"
        }), avatar);
        const attachment = new MessageAttachment(image, "slap.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};