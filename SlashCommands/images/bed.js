const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "bed",
    description: "bed image",
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

        const image = await Canvas.bed(interaction.member.displayAvatarURL({
            format: "png"
        }), avatar);
        const attachment = new MessageAttachment(image, "bed.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};