const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "kiss",
    description: "kiss image",
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
        const image = await Canvas.kiss(interaction.member.displayAvatarURL({
            format: "png"
        }), avatar);
        const attachment = new MessageAttachment(image, "kiss.png");

        interaction.followUp({
            embed: [],
            files: [attachment]
        }).catch(() => {});
    },
};
