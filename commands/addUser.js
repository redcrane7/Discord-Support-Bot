const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("add-user")
    .setDescription("Admin can add user at any ticket by using this command!"),
  async execute(interaction) {
    await interaction.reply("created user");
  },
};
