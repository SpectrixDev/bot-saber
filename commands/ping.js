const Discord = require("discord.js");

module.exports = {
  name: "ping",
  description: "Ping!",
  execute(msg, client) {
    msg.channel.send("Pinging...").then((sent) => 
    {
      const embed = new Discord.MessageEmbed()
      .setColor("#f03030")
      .setFooter(`Requested by: ${msg.author.tag}`, msg.author.displayAvatarURL)
      .setThumbnail("https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png")
      .setTitle("**Pong!**")
      .addFields({
        name: "🏓 Latency:",
        value: `${sent.createdTimestamp - msg.createdTimestamp}ms`
      },
      {
        name: "❤️ Heartbeat:",
        value: `${msg.client.ws.ping}ms`
      })
      sent.edit(embed);
    })
  }
}
