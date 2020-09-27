const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "hot",
  aliases: ["hotsongs"],
  description: "Returns a list of currently hot songs",
  usage: "b!hot",
  async execute(msg, args) {
    msg.channel.startTyping();
    var config = {
      method: "get",
      url: "https://beatsaver.com/api/maps/hot/0",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BeatSaberDiscordBot",
      },
    };

    axios(config)
      .then(function (response) {

        const dataEmbed = new Discord.MessageEmbed()
          .setColor("#309eff")
          .setTitle("**📈 Latest hot beatmaps**")
          .setThumbnail("https://media4.giphy.com/media/47GPQ7ZzivsemHKPvB/source.gif")
          .setAuthor("Bot Saber")
          .setDescription(generateFields(response.data.docs))
          .setFooter(
            `Data fetched from Beat Saver 🔥`,
            "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
          );

        msg.channel.send(dataEmbed);

        msg.channel.stopTyping();
      })
      .catch(function (error) {
        console.log(error);
        msg.channel.send(
          "❌ There was an error trying to execute that command!",
        );
        msg.channel.stopTyping();
      });
  },
};

function generateFields(input) {
  let data = [];

  for (i in input) {
    let pad = (number) => {
      return (number < 10 ? "0" : "") + number;
    };
    data.push(
      `\`${pad(parseInt(i) + 1)}.\` [${
        input[i].name
      }](https://beatsaver.com/beatmap/${input[i].key})`,
    );
  }

  return data;
}
