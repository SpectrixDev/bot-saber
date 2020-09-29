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
        \n🔰 [Add the bot to your server!](https://discord.com/oauth2/authorize?client_id=753289892007510017&scope=bot&permissions=74837056)
        \n❔ [Support Server](https://discord.gg/Ny6zTNH)
        \n⚠️ [GitHub issues page](https://github.com/SpectrixOfficial/bot-saber/issues)**`,
      );

      let embedData = new Discord.MessageEmbed()
        .setColor("#f03030")
        .setTitle("**User commands:**")
        .setThumbnail("https://cdn.discordapp.com/attachments/478201257417244675/760183259602092052/unknown.png")
        .setDescription(data)
        .setFooter(
          `By Spectrix & SamHep0803 👌`,
          "https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png",
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

    if (command.aliases) {
      data.push(`**Aliases:** ${command.aliases.join(", ")}`);
    }
    if (command.description) {
      data.push(`**Description:** ${command.description}`);
    }
    if (command.usage) data.push(`**Usage:** ${command.usage}`);

    let embedData = new Discord.MessageEmbed()
    .setColor("#f03030")
    .setTitle(`❓ **Help: **` + "`" + command.name + "`")
    .setThumbnail(
      "https://media.discordapp.net/attachments/478201257417244675/760179214300872754/BotSaberThumbnail.png",
    )
    .setDescription(data)
    .setFooter(
      "By Spectrix & SamHep0803 👌",
      "https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png",
    )

    msg.channel.send(embedData);
  },
};
