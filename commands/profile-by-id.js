const Discord = require("discord.js");

module.exports = {
  name: "profile-by-id",
  aliases: ["id", "user-by-id"],
  description:
    "Returns the user profile from scoresaber, using the steam or scoresaber ID.",
  args: true,
  usage: "b!user-by-id <Scoresaber ID>",

  async execute(msg, args) {
    msg.channel.startTyping()
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://new.scoresaber.com/api/player/${args[0]}/full`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const { playerInfo, scoreStats } = res.data;
        const {
          playerId,
          playerName,
          avatar,
          rank,
          countryRank,
          pp,
          country,
        } = playerInfo;
        const {
          totalScore,
          totalRankedScore,
          averageRankedAccuracy,
          totalPlayCount,
          rankedPlayCount,
        } = scoreStats;

        const dataEmbed = new Discord.MessageEmbed()
          .setColor("#309eff")
          .setTitle(`**User:** ${playerName}`)
          .setURL(`https://new.scoresaber.com/u/${playerId}`)
          .setAuthor("Beat Saber Bot")
          .addFields(
            {
              name: "ℹ __Player Info__",
              value: `• **Rank:** #${rank.toLocaleString()}\n` +
                `• **Country Rank:** #${countryRank.toLocaleString()}\n` +
                `• **PP:** ${(Math.round(
                  (pp + Number.EPSILON) * 100,
                ) / 100).toLocaleString()}\n` +
                `• **Country:** ${country} :flag_${country.toLowerCase()}:`,
            },
            {
              name: "📈 __Player Stats__\n",
              value: `**• Total Score:** ${totalScore.toLocaleString()}\n` +
                `• **Total Ranked Score:** ${totalRankedScore.toLocaleString()}\n` +
                `•**Average Ranked Accuracy:** ${Math.round(
                   (averageRankedAccuracy + Number.EPSILON) * 100,
                 ) / 100}%\n` +
                 `• **Total Play Count:** ${totalPlayCount.toLocaleString()}\n` +
                 `• **Ranked Play Count:** ${rankedPlayCount.toLocaleString()}`,
                },
          )
          .setThumbnail(`https://new.scoresaber.com${avatar}`)
          .setFooter(
            `User ID: ${playerId}`,
            "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
              );

        msg.channel.send(dataEmbed);
      })
      .catch((error) => {
        console.log(error);
      });
      msg.channel.stopTyping();
  },
};
