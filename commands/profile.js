const axios = require("axios");
const Discord = require("discord.js");

module.exports = {
  name: "profile",
  description: "Gets user info and stats via it's Beat Saver/Steam ID or Name.",
  args: true,
  aliases: ["user"],
  usage: "b!profile <type-of-search (id or name)> <search>",
  async execute(msg, args) {
    if (args[0].toLowerCase() == "id") {
      msg.channel.startTyping();

      msg.channel.send(await getPlayerByID(args[1]));

      msg.channel.stopTyping();
    } else if (args[0] == "name") {
      msg.channel.startTyping();

      msg.channel.send(await getPlayerByName(args[1]));

      msg.channel.stopTyping();
      } else {
        msg.channel.send("No search type specified, defaulting to \"name\".");

        msg.channel.send(await getPlayerByName(args[0]));
      }
    }
  };

async function getPlayerByID(playerId) {
  const config = {
    method: "get",
    url: `https://new.scoresaber.com/api/player/${playerId}/full`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let returnedEmbed;

  await axios(config)
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
        .addFields(
          {
            name: "ℹ __Player Info__",
            value: `**Rank:** #${rank.toLocaleString()}\n` +
              `**Country Rank:** #${countryRank.toLocaleString()}\n` +
              `**PP:** ${
                (Math.round(
                  (pp + Number.EPSILON) * 100,
                ) / 100).toLocaleString()
              }\n` +
              `**Country:** ${country} :flag_${country.toLowerCase()}:`,
          },
          {
            name: "📈 __Player Stats__\n",
            value: `**Total Score:** ${totalScore.toLocaleString()}\n` +
              `**Total Ranked Score:** ${totalRankedScore.toLocaleString()}\n` +
              `**Average Ranked Accuracy:** ${Math.round(
                (averageRankedAccuracy + Number.EPSILON) * 100,
              ) / 100}%\n` +
              `**Total Play Count:** ${totalPlayCount.toLocaleString()}\n` +
              `**Ranked Play Count:** ${rankedPlayCount.toLocaleString()}`,
          },
        )
        .setThumbnail(`https://new.scoresaber.com${avatar}`)
        .setFooter(
          `User ID: ${playerId}`,
          "https://cdn.discordapp.com/attachments/478201257417244675/760182130352586802/unknown.png",
        );

      returnedEmbed = dataEmbed;
    }).catch((err) => {
      console.log(err);
    });

    return returnedEmbed;
}

async function getPlayerByName(playerName) {
  var config = {
    method: "get",
    url: `https://new.scoresaber.com/api/players/by-name/${playerName}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  let returnedEmbed;

  await axios(config)
    .then(async (res) => {
      const { players } = res.data;
      const { playerId } = players[0];

      const embedSend = await getPlayerByID(playerId);
      returnedEmbed = embedSend;
    })
    .catch((error) => {
      console.log(error);
      msg.channel.send(`:x: User ${args[1]} not found! Try using an ID instead?`);
    });
  
  return returnedEmbed;
}
