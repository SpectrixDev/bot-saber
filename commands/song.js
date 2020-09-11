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
          plays,
          downVotes,
          upVotes,
          heat,
          rating,
        } = stats;
        const {
          easy,
          normal,
          hard,
          expert,
          expertPlus,
        } = difficulties;

        const mapEmbed = new Discord.MessageEmbed()
          .setColor("#f03030")
          .setTitle(`**Beatmap:** ${name}`)
          .setURL(`https://beatsaver.com/beatmap/${key}`)
          .setAuthor("Beat Saber Bot")
          .addFields(
            {
              name: "__Beatmap Info__",
              value: (
                `**Level Author:** ${aiOrNo(levelAuthorName)}\n` +
                `**Duration:** ${duration}\n` +
                `**Beatmap BPM:** ${bpm}`
              ),
            },
            {
              name: "__Beatmap Stats__",
              value: (
                `**Downloads:** ${downloads}\n` +
                `**Plays:** ${plays}\n` +
                `**Upvotes:** ${upVotes}\n` +
                `**Downvotes:** ${downVotes}\n` +
                `**Heat:** ${heat}\n` +
                `**Rating:** ${rating}`
              ),
            },
            {
              name: "__Beatmap Difficulties__",
              value: (
                `**Easy:** ${yesOrNo(easy)}\n` +
                `**Normal:** ${yesOrNo(normal)}\n` +
                `**Hard:** ${yesOrNo(hard)}\n` +
                `**Expert:** ${yesOrNo(expert)}\n` +
                `**Expert Plus:** ${yesOrNo(expertPlus)}`
              ),
            },
          )
          .setThumbnail(`https://beatsaver.com${coverURL}`)
          .setFooter(
            `Info results from Beat Saver.`,
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

function yesOrNo(input) {
  if (input == true) {
    return "Yes";
  } else if (input == false) {
    return "No";
  } else {
    return "Something went wrong trying to figure out this difficulty!";
  }
}

function aiOrNo(input) {
  if (input == "Beat Sage") {
    return "Created by AI.";
  } else {
    return input;
  }
}
