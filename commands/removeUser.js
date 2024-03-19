const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("remove-user")
    .setDescription(
      "Admin can remove user at any ticket by using this command!"
    ),
  async execute(interaction) {
    await interaction.reply("removed user");
  },
};
