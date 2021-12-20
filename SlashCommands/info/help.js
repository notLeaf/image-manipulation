const {
    MessageEmbed,
    MessageActionRow,
    MessageSelectMenu
} = require("discord.js")
const {
    fail
} = require('../../config.json')

module.exports = {
    name: 'help',
    description: 'All commands',

    run: async (client, interaction) => {
        
        const embed = new MessageEmbed()
            .setTitle(`${client.user.username}'s Commands`)
            .setDescription('Click the menu below')
            .addField(`Links:`, `[Youtube Channel](https://www.youtube.com/channel/UC9yRVadElzxSO3ZUywK6Yig) - [Discord Server](https://discord.gg/yfD2Vmnr6F)`, true)
            .setColor('RANDOM')
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
            .setTimestamp()

        const image = new MessageEmbed()
            .setTitle("Image manipulation Commands")
            .setDescription("\`affect\`, \`beautiful\`, \`bed\`, \`blur\`, \`brightness\`, \`burn\`, \`changemymind\`, \`circle\`, \`clyde\`, \`colorfy\`, \`darkness\`, \`delete\`, \`distracted\`, \`facepalm\`, \`fusion\`, \`greyscale\`, \`invert\`, \`jail\`, \`kiss\`, \`rainbow\`, \`rip\`, \`sepia\`, \`sharpen\`, \`slap\`, \`spank\`, \`trash\`, \`triggered\`, \`wanted\`, \`wasted\`")
            .setColor('RANDOM')
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
            .setTimestamp();


        const general = new MessageEmbed()
            .setTitle("Info Commands")
            .setDescription("\`help\`, \`ping\`")
            .setColor('RANDOM')
            .setFooter(interaction.user.username, interaction.user.displayAvatarURL())
            .setTimestamp();

        const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select a Category")
                .setDisabled(state)
                .addOptions([{
                        label: `Image Manipulation`,
                        value: `image`,
                        description: `Image commands`,
                        emoji: `🖼️`
                    },
                    {
                        label: `General`,
                        value: `general`,
                        description: `Info commands`,
                        emoji: `ℹ️`
                    }
                ])
            ),
        ];

        const initialMessage = await interaction.editReply({
            embeds: [embed],
            components: components(false)
        });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (b) => {
                if (b.user.id === interaction.member.user.id) return true;
                else {
                    b.reply({
                        ephemeral: true,
                        content: `${fail} Only **${interaction.member.user.tag}** can use this menu`
                    });
                    return false;
                };
            },
            componentType: "SELECT_MENU",
            time: 300000,
            idle: 300000 / 2
        });

        collector.on('collect', (interaction) => {
            if (interaction.values[0] === "image") {
                interaction.update({
                    embeds: [image],
                    components: components(false)
                });
            } else if (interaction.values[0] === "general") {
                interaction.update({
                    embeds: [general],
                    components: components(false)
                });
            }
        });
        collector.on('end', () => {
            initialMessage.edit({
                components: components(true)
            });
        })
    },
};