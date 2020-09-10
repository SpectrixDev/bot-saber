const Discord = require("discord.js");

module.exports = {
  name: "user-by-id",
  aliases: ["id"],
  description:
    "Returns the user profile from scoresaber, using the steam or scoresaber ID.",
  args: true,
  usage: "b!user-by-id <Scoresaber ID>",

  async execute(msg, args) {
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
              name: "__Player Info__",
              value: `**Rank:** ${rank}\n` +
                `**Country Rank:** ${countryRank}\n` +
                `**PP:** ${pp}\n` +
                `**Country:** ${country}`,
            },
            {
              name: "__Player Stats__\n",
              value: `**Total Score:** ${totalScore}\n` +
                `**Total Ranked Score:** ${totalRankedScore}\n` +
                `**Average Ranked Accuracy:** ${Math.round(
                  (averageRankedAccuracy + Number.EPSILON) * 100,
                ) / 100}%\n` +
                `**Total Play Count:** ${totalPlayCount}\n` +
                `**Ranked Play Count:** ${rankedPlayCount}`,
            },
          )
          .setThumbnail(`https://new.scoresaber.com${avatar}`);

        msg.channel.send(dataEmbed);
      })
      .catch((err) => {
        console.log(error);
      });
  },
};
