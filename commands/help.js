const Discord = require("discord.js");
const { prefix } = require("../config.json");
module.exports = {
  name: "help",
  aliases: ["commands", "h"],
  description: "List all of the bots commands or info about a specific command",
  usage: "b!help [command name]",
  execute(msg, args, client, guildConfig) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push("ℹ  **__Here's a list of all the bot's commands:__**\n");
      data.push(commands.map((command) => ("• " + command.name)).join("\n"));
      data.push(
        `\n❕ **You can send \`${guildConfig.prefix}help [command name]\` to get info on a specific command.
        \n❔ [Support Server](https://discord.gg/Ny6zTNH)
        \n⚠️ [GitHub issues page](https://github.com/SpectrixOfficial/bot-saber/issues)**`,
      );

      let embedData = new Discord.MessageEmbed()
        .setColor("#f03030")
        .setTitle("**User commands:**")
        .setThumbnail(
          "https://media.discordapp.net/attachments/753288806928482354/759496798095015946/unknown.png",
        )
        .setDescription(data)
        .setFooter(
          `By Spectrix & SamHep0803 👌`,
          "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
        );

      return msg.channel.send(embedData);
    }

    const name = args[0].toLowerCase();
    const command = commands.get(name) ||
      commands.find((c) => c.aliases && c.aliases.includes(name));

    if (!command) {
      return msg.reply("That's not a valid command!");
    }

    data.push(`**Name:** ${command.name}`);

    if (command.aliases) { // hello
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    }
    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }
    if (command.usage) data.push(`**Usage:** ${command.usage}`);

    msg.channel.send(data, { split: true });
  },
};
