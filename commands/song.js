const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "song",
  aliases: ["map", "beatmap"],
  description: "Gets info about a beatmap via it's name.",
  usage: "b!song <name-of-song>",
  args: true,
  async execute(msg, args) {
    msg.channel.startTyping();
    var config = {
      method: "get",
      url: `https://beatsaver.com/api/search/text/1?q=${args[0]}`,
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "BeatSaberDiscordBot",
      },
    };

    axios(config)
      .then(function (response) {
        const {
          metadata,
          stats,
          key,
          name,
          coverURL,
        } = response.data.docs[0];
        const {
          difficulties,
          duration,
          levelAuthorName,
          bpm,
        } = metadata;
        const {
          downloads,
          downVotes,
          upVotes,
          rating,
        } = stats;
        const {
          easy,
          normal,
          hard,
          expert,
          expertPlus,
        } = difficulties;

        var difficultylist = '';
        for (var i in difficulties) { // Needs to be alphabetical I think
          if (difficulties[i] == true && difficulties.hasOwnProperty(i)) {
            difficultylist+=`- ${i.charAt(0).toUpperCase() + i.slice(1)}\n`
          }}

        const mapEmbed = new Discord.MessageEmbed()
          .setColor("#f03030")
          .setTitle(`**Beatmap:** ${name}`)
          .setURL(`https://beatsaver.com/beatmap/${key}`)
          .setAuthor("Beat Saber Bot")
          .addFields(
            {
              name: "ℹ __Beatmap Info__",
              value: (
                `• **Level Author:** ${aiOrNo(levelAuthorName)}\n` +
                `• **Duration:** ${duration}\n` +
                `• **Beatmap BPM:** ${Math.round(
                  (bpm + Number.EPSILON) * 100,
                  ) / 100}`
              ),
            },
            {
              name: "📈 __Beatmap Stats__",
              value: (
                `• **Downloads:** ${downloads.toLocaleString()}\n` +
                `• **Upvotes:** ${upVotes.toLocaleString()}\n` +
                `• **Downvotes:** ${downVotes.toLocaleString()}\n` +
                `• **Rating:** ${Math.round(
                  (rating*100 + Number.EPSILON) * 100,
                  ) / 100}%`
              ),
            },
            {
              name: "📊 __Beatmap Difficulties__",
              value: (
                (difficultylist))
            },
          )
          .setThumbnail(`https://beatsaver.com${coverURL}`)
          .setFooter(
            `Info results from Beat Saver. 🔑${key}`,
            "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
          );

        msg.channel.send(mapEmbed);
        msg.channel.stopTyping();
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};

function aiOrNo(input) {
  if (input == "Beat Sage") {
    return "Created by AI.";
  } else {
    return input;
  }
}
