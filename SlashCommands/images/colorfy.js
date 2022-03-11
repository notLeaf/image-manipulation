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

        function randomHexColor() {
            return (
                '#' +
                ('000000' + Math.floor(Math.random() * 16777215).toString(16)).slice(-6)
            );
        }

        const user = interaction.options.getUser('target') || interaction.member;
        const avatar = user.displayAvatarURL({
            format: "png"
        })
        const image = await Canvas.colorfy(avatar, randomHexColor());
        const attachment = new MessageAttachment(image, "colorfy.png");

        interaction.followUp({
            embeds: [],
            files: [attachment]
        }).catch(() => {});
    },
};