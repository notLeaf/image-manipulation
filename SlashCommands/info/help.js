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
    category: "info",

    run: async (client, interaction) => {

        const embed = new MessageEmbed()
            .setTitle(`${client.user.username}'s Commands`)
            .setDescription('Click the menu below')
            .addField(`Links:`, `[Youtube Channel](https://www.youtube.com/channel/UC9yRVadElzxSO3ZUywK6Yig) - [Discord Server](https://discord.gg/yfD2Vmnr6F)`, true)
            .setColor('RANDOM')
            .setFooter({
                text: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()

        const image = new MessageEmbed()
            .setTitle("Image manipulation Commands")
            .setDescription(client.slashCommands.filter(cmd => cmd.category === "images").map(cmd => `\`${cmd.name}\``).join(', '))
            .setColor('RANDOM')
            .setFooter({
                text: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp();


        const general = new MessageEmbed()
            .setTitle("Info Commands")
            .setDescription(client.slashCommands.filter(cmd => cmd.category === "info").map(cmd => `\`${cmd.name}\``).join(', '))
            .setColor('RANDOM')
            .setFooter({
                text: `${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true
                })
            })
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