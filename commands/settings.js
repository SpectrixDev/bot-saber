module.exports = {
  name: "settings",
  aliases: ["config"],
  description: "Server configuration for the bot.",
  execute(msg, args, client, guildConf, defaultSettings) {
    if(args[0] == "view") {
      let configProps = Object.keys(guildConf).map(prop => {
        return `${prop} : ${guildConf[prop]}\n`;
      });
      msg.channel.send(`The following are the server's current settings:
      \`\`\`${configProps}\`\`\``)
    } else {
      const adminRole = msg.guild.roles.cache.find(role => role.name === guildConf.adminRole)
      if(!adminRole) return msg.reply("Administrator role not found (you may need to temporarily rename your admin role to \"Admin\")");

      if(!msg.member.roles.cache.has(adminRole.id)) {
        return msg.reply("You're not an admin ;-;");
      }

      const [prop, ...value] = args;

      if(!client.settings.has(msg.guild.id, prop)) {
        return msg.reply("This setting is not in the config!")
      }

      client.settings.set(msg.guild.id, value.join(" "), prop);

      msg.channel.send(`Guild setting item ${prop} has been changed to:\n\`${value.join(" ")}\``)
    }
  }
};
