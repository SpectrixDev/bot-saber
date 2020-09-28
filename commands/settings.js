const Discord = require("discord.js");

module.exports = {
  name: "settings",
  aliases: ["config"],
  description: "Server configuration for the bot.",
  execute(msg, args, client, guildConf, defaultSettings) {
    if (args.length == 0) {
      let configProps = Object.keys(guildConf).map((prop) => {
        return `${prop} : ${guildConf[prop]}`;
      });

      const embedData = new Discord.MessageEmbed()
        .setColor("#309eff")
        .setTitle("**Server Settings.**")
        .setDescription(
          `The following are the server's current settings: \`\`\`${
            configProps.join("\n")
          }\`\`\``,
        )
        .setFooter(
          `Powered by Enmap™`,
          "https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png",
        );

      msg.channel.send(embedData);
    } else {
      const adminPermission = msg.member.hasPermission("MANAGE_GUILD");
      if (!adminPermission) {
        return msg.reply(
          'You don\'t have permission to use this command! (Make sure you have the "MANAGE_SERVER" permission.)',
        );
      }

      const [prop, ...value] = args;

      if (!client.settings.has(msg.guild.id, prop)) {
        return msg.reply("This setting is not in the config!");
      }

      client.settings.set(msg.guild.id, value.join(" "), prop);

      msg.channel.send(
        `Guild setting item ${prop} has been changed to:\n\`${
          value.join(" ")
        }\``,
      );
    }
  },
};
