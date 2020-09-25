const Discord = require("discord.js");
const { prefix } = require("../config.json");

module.exports = {
  name: "help",
  aliases: ["commands", "h"],
  description: "List all of the bots commands or info about a specific command",
  usage: "b!help [command name]",
  execute(msg, args) {
    const data = [];
    const { commands } = msg.client;

    if (!args.length) {
      data.push("Here's a list of all the bot's commands:");
      data.push(commands.map((command) => command.name).join("\n"));
      data.push(
        `\nYou can send \`${prefix}help [command name]\` to get info on a specific command.`,
      );

      let embedData = new Discord.MessageEmbed()
        .setColor("#f03030")
        .setTitle("**User commands.**")
        .setAuthor("Bot Saber")
        .setDescription(data)
        .setFooter(
          `Did you know: The developers love ARGs.`,
          "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
        );

      return msg.author.send(embedData)
        .then(() => {
          if (msg.channel.type === "dm") return;
          msg.reply("I've sent you a DM with all my commands!");
        })
        .catch((err) => {
          console.error(`Could not send help DM to ${msg.author.tag}.\n`, err);
          msg.reply("It seems like I can't DM you. Do you have your DMs open?");
        });
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

    msg.channel.send(data, { split: true });
  },
};
