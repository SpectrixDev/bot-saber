const Discord = require("discord.js");

module.exports = {
  name: "profile-by-name",
  aliases: ["name", "user", "profile"],
  description:
    "Returns the user profile from scoresaber using the profile name.",
  args: true,
  usage: "b!user <Scoresaber ID>",

  async execute(msg, args) { 
    msg.channel.startTyping()
    var axios = require("axios");

    var config = {
      method: "get",
      url: `https://new.scoresaber.com/api/players/by-name/${args[0]}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        const { players } = res.data;
        const { playerId } = players[0];

        const config = {
          method: "get",
          url: `https://new.scoresaber.com/api/player/${playerId}/full`,
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
                  value: `• **Total Score:** ${totalScore.toLocaleString()}\n` +
                    `• **Total Ranked Score:** ${totalRankedScore.toLocaleString()}\n` +
                    `• **Average Ranked Accuracy:** ${Math.round(
                      (averageRankedAccuracy + Number.EPSILON) * 100,
                    ) / 100}%\n` +
                    `• **Total Play Count:** ${totalPlayCount.toLocaleString()}\n` +
                    `• **Ranked Play Count:** ${rankedPlayCount.toLocaleString()}\n`
                },
              )
              .setThumbnail(`https://new.scoresaber.com${avatar}`)
              .setFooter(
                `User ID: ${playerId}`,
                "https://pbs.twimg.com/profile_images/1191299666048167936/tyGQRx5x_400x400.jpg",
              );

            msg.channel.send(dataEmbed);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
      });
      msg.channel.stopTyping();
  },
};
