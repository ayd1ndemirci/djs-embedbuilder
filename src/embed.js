const { ModalBuilder, PermissionsBitField, TextInputBuilder, ActionRowBuilder, TextInputStyle, EmbedBuilder, Colors } = require('discord.js');

module.exports = {
    name: 'embed',
    description: "Embed mesajı",
    type: 3,
    options: [],
    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'Bu komut yönetici komutudur', ephemeral: true });

        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Embed Creator');

        const embedTitle = new TextInputBuilder()
            .setCustomId('embedTitle')
            .setLabel("Embed Tıtle")
            .setStyle(TextInputStyle.Short);

        const embedDescription = new TextInputBuilder()
            .setCustomId('embedDescription')
            .setLabel("Embed Description")
            .setStyle(TextInputStyle.Paragraph);

        const embedColor = new TextInputBuilder()
            .setCustomId('embedColor')
            .setLabel("Embed Color")
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const embedThumbnail = new TextInputBuilder()
            .setCustomId('embedThumbnail')
            .setLabel('Embed Thumbnail URL')
            .setRequired(false)
            .setStyle(TextInputStyle.Short);

        const firstActionRow = new ActionRowBuilder().addComponents(embedTitle);
        const secondActionRow = new ActionRowBuilder().addComponents(embedDescription);
        const thirdActionRow = new ActionRowBuilder().addComponents(embedColor);
        const fourthActionRow = new ActionRowBuilder().addComponents(embedThumbnail);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow);

        await interaction.showModal(modal);

        const filter = (interaction) => interaction.customId === `myModal`;
        interaction
            .awaitModalSubmit({ filter, time: 30_000 })
            .then((modalInteraction) => {
                const title = modalInteraction.fields.getTextInputValue('embedTitle');
                const description = modalInteraction.fields.getTextInputValue('embedDescription');
                const color = modalInteraction.fields.getTextInputValue('embedColor');
                const thumbnail = modalInteraction.fields.getTextInputValue('embedThumbnail');

                let colorChange = "Grey";

                if (color && /^[0-9A-Fa-f]{6}$/g.test(color)) {
                    colorChange = `#${color}`;
                }

                let embed = new EmbedBuilder()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(colorChange);

                if (thumbnail) {
                    embed.setThumbnail(thumbnail);
                }

                modalInteraction.reply({ embeds: [embed] });
            });
    }
}
