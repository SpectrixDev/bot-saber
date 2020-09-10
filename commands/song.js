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

        const mapEmbed = new Discord.MessageEmbed()
          .setTitle(`**Beatmap:** ${name}`)
          .setURL(`https://beatsaver.com/beatmap/${key}`)
          .setAuthor("Beat Saber Bot")
          .addFields(
            {
              name: "__Beatmap Info__",
              value: (
                `**Level Author:** ${levelAuthorName}\n` +
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
            // {
            //   name: "Beatmap Difficulties",
            //   value: (
            //     ``
            //   )
            // }
          )
          .setThumbnail(`https://beatsaver.com${coverURL}`);

        msg.channel.send(mapEmbed);
        msg.channel.stopTyping();
        console.log(response.data.docs[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
