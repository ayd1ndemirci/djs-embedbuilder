const {Collection, EmbedBuilder} = require("discord.js");
const {readdirSync} = require("fs");
module.exports = async (client, interaction) => {

    if (interaction.isChatInputCommand()) {

        if (!interaction.guildId) return;

        readdirSync('./src').forEach(f => {

            const cmd = require(`../src/${f}`);

            if (interaction.commandName.toLowerCase() === cmd.name.toLowerCase()) {
                return cmd.run(client, interaction);
            }
        });
    }

};
