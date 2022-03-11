const {
    Client,
    CommandInteraction,
    MessageAttachment
} = require("discord.js");
const {
    Canvas
} = require("canvacord");

module.exports = {
    name: "changemymind",
    description: "changemymind image",
    category: "images",
    clientPermissions: ["ATTACH_FILES"],
    options: [{
        name: "query",
        description: "text you want to say",
        type: "STRING",
        required: true
    }],

    run: async (client, interaction, args) => {

        let text = interaction.options.getString('query')?.trim()?.split(/ +/g)?.join(" ");
        if (text.length > 50) text = text.slice(0, 45) + '...';

        const image = await Canvas.changemymind(text);
        const attachment = new MessageAttachment(image, "changemymind.png");

        interaction.followUp({
            files: [attachment]
        }).catch(() => {});
    },
};