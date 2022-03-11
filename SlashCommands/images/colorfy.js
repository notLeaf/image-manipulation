const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "colorfy",
    description: "colorfy image",
    category: "images",
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

        const image = await Canvas.colorfy(avatar, randomHexColor());
        const attachment = new MessageAttachment(image, "colorfy.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};

function randomHexColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}